from django.conf.urls import url

from .views import (
    PostAPIListView,
    PostDetailAPIView,
    PostIconUploadView,
    PostLikeNumIncView,
)


urlpatterns = [
    url(r'^(?P<uuid>[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})/$',
        PostDetailAPIView.as_view(), name='post-detail-api'),
    url(r'^list/$', PostAPIListView.as_view(), name='post-list-api'),
    url(r'^(?P<uuid>[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})/upload-icon/$',
        PostIconUploadView.as_view(), name='upload-post-icon'),
    url(r'^(?P<uuid>[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})/like/$',
        PostLikeNumIncView.as_view(), name='post-like'),
]