from rest_framework.views import Response

from .serializers import UserSerializer
from .utils import get_token

COOKIE_VALID_TIME = 1200


def perform_login(user):
    token = get_token(user=user)
    user_serializer = UserSerializer(user)
    response = Response(data=user_serializer.data, status=200)
    response.set_cookie('token', token, COOKIE_VALID_TIME)
    return response
