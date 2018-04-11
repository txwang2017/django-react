from django.conf.urls import url

from .views import (
    SignInView,
    SignUpView,
    CheckAuthentication,
    SignOutView,
    UploadAvatarView,
)


urlpatterns = [
    url(r'^sign-up/$', SignUpView.as_view(), name='sign-up-api'),
    url(r'^sign-in/$', SignInView.as_view(), name='sign-in-api'),
    url(r'^check-authentication/$', CheckAuthentication.as_view(), name='check-authentication'),
    url(r'^sign-out/$', SignOutView.as_view(), name='sign-out-api'),
    url(r'^upload-avatar/$', UploadAvatarView.as_view(), name='upload-avatar-api')
]