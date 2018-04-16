# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import AnonymousUser

from rest_framework.views import APIView, Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import FileUploadParser
from rest_auth.views import LoginView, LogoutView
from rest_auth.registration.views import RegisterView

from .serializers import UserSerializer
from .utils import upload_avatar


class SignUpView(RegisterView):

    def get_response_data(self, user):
        user.token = self.token
        return UserSerializer(user).data

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=False):
            return super(SignUpView, self).create(request, *args, **kwargs)
        else:
            ret_data = {'err': True}
            ret_data.update(serializer.errors)
            return Response(ret_data)

    def post(self, request, *args, **kwargs):
        user = super(SignUpView, self).post(request, *args, **kwargs).data
        return Response(status=200, data=user)


class SignInView(LoginView):

    def post(self, request, *args, **kwargs):
        # super(SignInView, self).post(request, *args, **kwargs)

        self.request = request
        self.serializer = self.get_serializer(
            data=self.request.data,
            context={'request': request}
        )
        if self.serializer.is_valid():
            self.login()
            if request.user.__class__ is AnonymousUser:
                return Response({'err': 'username or password is wrong'})
            else:
                user = request.user
                user.token = self.token
                user_info = UserSerializer(user).data
                return Response(status=200, data=user_info)
        else:
            return Response({'err': 'username or password is wrong'})


class CheckAuthentication(APIView):

    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        user = request.user
        if user.__class__ is AnonymousUser:
            return Response({'err': True})
        else:
            serializer = UserSerializer(user)
            return Response(status=200, data=serializer.data)


class SignOutView(LogoutView):
    pass


class UploadAvatarView(APIView):

    parser_classes = (FileUploadParser,)
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        avatar = request.data.get('file')
        avatar_uuid = upload_avatar(avatar=avatar, user=request.user)
        return Response(status=200, data={'avatar': avatar_uuid})
