from django.conf.urls import url

from .views import PostSearchView


urlpatterns = [
    url(r'^$', PostSearchView.as_view(), name='post-search')
]