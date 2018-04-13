# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.views.decorators.cache import cache_page

from rest_framework.views import APIView, Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import FileUploadParser

from .serializer import PostSerializer, PostsSerializer, CommentSerializer
from .utils import get_all_posts, get_post, get_comments_by_post, upload_post_icon


class PostListPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class PostAPIListView(APIView):

    author = None
    paginator = None
    queryset = get_all_posts().order_by('pub_time').reverse()

    def initial(self, request, *args, **kwargs):
        self.author = request.user
        self.paginator = PostListPagination()
        super(PostAPIListView, self).initial(request, *args, **kwargs)

    def paginate_queryset(self, queryset):
        return self.paginator.paginate_queryset(queryset, self.request, view=self)

    def get_paginated_response(self, data):
        return self.paginator.get_paginated_response(data)

    def get_paginate_queryset(self, queryset):
        page = self.paginate_queryset(queryset)
        if page is not None:
            for post in page:
                post.author_avatar = post.author.avatar
            serializer = PostsSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        for post in queryset:
            post.author_avatar = post.author.avatar
        serializer = PostsSerializer(queryset, many=True)
        return Response(serializer.data)

    def get_permissions(self):
        if self.request._request.method == "GET":
            return [AllowAny()]
        elif self.request._request.method == "POST":
            return [IsAuthenticated()]

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
        query_set = self.queryset
        return self.get_paginate_queryset(query_set)


class PostDetailAPIView(APIView):

    author = None

    def initial(self, request, *args, **kwargs):
        self.author = request.user
        super(PostDetailAPIView, self).initial(request, *args, **kwargs)

    def get_permissions(self):
        if self.request._request.method == "GET":
            return [AllowAny()]
        elif self.request._request.method == "POST":
            return [IsAuthenticated()]

    def get(self, request, *args, **kwargs):
        uuid = kwargs.get('uuid')
        post = get_post(post_uuid=uuid)
        post.author_avatar = post.author.avatar
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


class PostIconUploadView(APIView):
    parser_classes = (FileUploadParser,)
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        uuid = kwargs.get('uuid')
        icon = request.data.get('file')
        upload_post_icon(icon=icon, uid=uuid)
        return Response(status=200, data={'success': True})



