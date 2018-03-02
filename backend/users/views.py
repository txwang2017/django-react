# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import AnonymousUser

from rest_framework.views import APIView, Response
from rest_framework.permissions import AllowAny
from rest_auth.views import LoginView, LogoutView
from rest_auth.registration.views import RegisterView

from .serializers import (
    UserSerializer,
)


class SignUpView(RegisterView):

    def get_response_data(self, user):
        return UserSerializer(user).data

    def post(self, request, *args, **kwargs):
        user = super(SignUpView, self).post(request, *args, **kwargs).data
        return Response(status=200, data=user)


class SignInView(LoginView):

    def post(self, request, *args, **kwargs):
        super(SignInView, self).post(request, *args, **kwargs)
        if request.user.__class__ is AnonymousUser:
            return Response(status=400)
        else:
            user_info = UserSerializer(request.user).data
            return Response(status=200, data=user_info)


class CheckAuthentication(APIView):

    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        user = request.user
        if user.__class__ is not AnonymousUser:
            serializer = UserSerializer(user)
            return Response(status=200, data=serializer.data)
        else:
            return Response(status=400)


class SignOutView(LogoutView):
    pass
