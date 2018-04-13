# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from users.models import User


class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    title = models.TextField()
    content = models.TextField()
    pub_time = models.DateTimeField(auto_now=True)
    like_num = models.IntegerField(default=0)
    read_num = models.IntegerField(default=0)
    uuid = models.CharField(max_length=36, unique=True)
    icon = models.BooleanField(default=False)


class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    post = models.ForeignKey(Post, on_delete=models.DO_NOTHING)
    content = models.TextField()
    pub_time = models.DateTimeField(auto_now=True)
    uuid = models.CharField(max_length=36)
