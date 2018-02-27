# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.views import APIView, Response
from rest_framework.permissions import BasePermission, AllowAny

from users.utils import fetch_user_by_cookie
from .serializer import PostSerializer, PostsSerializer, CommentSerializer
from .utils import get_all_posts, get_post, get_comments_by_post


class PostPermission(BasePermission):

    def __init__(self, author):
        super(PostPermission, self).__init__()
        self.author = author

    def has_permission(self, request, view):
        return self.author is not None


class PostAPIListView(APIView):

    author = None

    def initial(self, request, *args, **kwargs):
        self.author = fetch_user_by_cookie(request=request)
        super(PostAPIListView, self).initial(request, *args, **kwargs)

    def get_permissions(self):
        if self.request._request.method == "GET":
            return [AllowAny()]
        elif self.request._request.method == "POST":
            return [PostPermission(self.author)]

    def post(self, request, *args, **kwargs):
        serializer = PostsSerializer(data=request.data)
        serializer.author = self.author
        if serializer.is_valid():
            post = serializer.save()
            data = PostsSerializer(post).data
            return Response(data=data, status=200)
        else:
            return Response(status=400)

    def get(self, request, *args, **kwargs):
        query_set = get_all_posts()
        data = [PostsSerializer(post).data for post in query_set]
        return Response(data=data)


class PostDetailAPIView(APIView):

    author = None

    def initial(self, request, *args, **kwargs):
        self.author = fetch_user_by_cookie(request=request)
        super(PostDetailAPIView, self).initial(request, *args, **kwargs)

    def get_permissions(self):
        if self.request._request.method == "GET":
            return [AllowAny()]
        elif self.request._request.method == "POST":
            return [PostPermission(self.author)]

    def get(self, request, *args, **kwargs):
        uuid = kwargs.get('uuid')
        post = get_post(post_uuid=uuid)
        if post is None:
            return Response(status=204)
        comments = get_comments_by_post(post=post)
        post.comments = comments
        serializer = PostSerializer(post)
        return Response(status=200, data=serializer.data)

    def post(self, request, *args, **kwargs):
        uuid = kwargs.get('uuid')
        post = get_post(post_uuid=uuid)
        if post is None:
            return Response(status=204)
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.author = self.author
            serializer.post = post
            comment = serializer.save()
            ret_serialzer = CommentSerializer(comment)
            return Response(status=200, data=ret_serialzer.data)
        else:
            return Response(status=400)




