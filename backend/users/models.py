from __future__ import unicode_literals
from hashlib import sha256

from django.contrib.auth.models import AbstractUser, UserManager
from django.core.exceptions import ObjectDoesNotExist
from django.db import models


class AdvUserManager(UserManager):
    def get_user(self, email, password):
        password = sha256(password).hexdigest()
        try:
            user = self.get(email=email, password=password)
        except ObjectDoesNotExist:
            user = None
        return user


class User(AbstractUser):
    username = models.CharField(max_length=255, unique=True, primary_key=True)
    password = models.CharField(max_length=64)
    email = models.EmailField(unique=True)
    last_login = models.DateTimeField(auto_now=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    avatar = models.CharField(blank=True, null=True, max_length=36)

    objects = AdvUserManager()

    def set_password(self, raw_password):
        self.password = sha256(raw_password).hexdigest()

    def check_password(self, raw_password):
        return self.password == sha256(raw_password).hexdigest()

    def get_username(self):
        return self.email

