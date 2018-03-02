from rest_framework.authtoken.models import Token

from .models import User


def get_user(email=None, password=None):
    user = User.objects.get_user(
        email=email,
        password=password,
    )
    return user


def create_user(**kwargs):
    for key in kwargs.keys():
        if not hasattr(User, key):
            kwargs.pop(key)
    username, email, password = kwargs.pop('username', ''),  kwargs.pop('email', ''), kwargs.pop('password', '')
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
        **kwargs
    )
    return user


def get_token(user):
    token = Token.objects.get_or_create(user=user)[0]
    return token.key


def fetch_user_by_cookie(request):
    cookie = request._request.COOKIES
    token = cookie.get('token',  None)
    user = None
    if token:
        try:
            user_id = Token.objects.get(key=token).user_id
            user = User.objects.get(pk=user_id)
        except:
            pass
    return user
