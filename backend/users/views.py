# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.views import APIView, Response

from .serializers import (
    SignUpSerializer,
    SignInSerializer,
    UserSerializer,
)
from .utils import (get_user, fetch_user_by_cookie)
from .helpers import perform_login


class SignUpView(APIView):

    def post(self, request, *args, **kwargs):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            response = perform_login(user=user)
            return response
        else:
            return Response(status=400)


class SignInView(APIView):

    def post(self, request, *args, **kwargs):
        serializer = SignInSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            user = get_user(email=email, password=password)
            if user:
                response = perform_login(user=user)
                return response
        return Response(status=400)


class CheckAuthentication(APIView):

    def post(self, request, *args, **kwargs):
        user = fetch_user_by_cookie(request=request)
        if user is not None:
            serializer = UserSerializer(user)
            return Response(status=200, data=serializer.data)
        else:
            return Response(status=400)


class SignOutView(APIView):

    def post(self, request, *args, **kwargs):
        response = Response(status=200)
        response.delete_cookie('token')
        return response

