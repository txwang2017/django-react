# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.response import Response
from rest_framework.views import APIView

from posts.utils import get_all_posts, filter_posts
from posts.serializer import PostsSerializer
from posts.views import PostListPagination


class PostSearchView(APIView):

    query_set = get_all_posts().order_by('pub_time').reverse()
    paginator = None

    def initial(self, request, *args, **kwargs):
        self.paginator = PostListPagination()
        super(PostSearchView, self).initial(request, *args, **kwargs)

    def paginate_queryset(self, queryset):
        return self.paginator.paginate_queryset(queryset, self.request, view=self)

    def get_paginated_response(self, data):
        return self.paginator.get_paginated_response(data)

    def get_paginate_queryset(self, queryset):
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = PostsSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = PostsSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        search_keywords = request.data.get('searchKeywords')
        queryset = filter_posts(self.query_set, search_keywords)
        return self.get_paginate_queryset(queryset)
