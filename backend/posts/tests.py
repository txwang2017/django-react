# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase

# Create your tests here.
#
from users.models import User
from random import randint
from .models import Comment, Post
from .utils import get_comment_uuid


def acc():
    users = User.objects.all()
    posts = Post.objects.all()
    for i in xrange(1000):
        nu = randint(0, len(users) - 1)
        np = randint(0, len(posts) - 1)
        c = ['a' for k in range(20)]
        for j in xrange(20):
            c[j] = chr(randint(97, 122))
        content = ''.join(c)
        Comment.objects.create(
            author=users[nu],
            content=content,
            post=posts[np],
            uuid=get_comment_uuid(),
        )

#
# def acp():
#     users = User.objects.all()
#     for i in xrange(1000):
#         n = randint(0, len(users) - 1)
#         t = ['a' for k in range(10)]
#         for j in xrange(10):
#             t[j] = chr(randint(97, 122))
#         title = ''.join(t)
#         c = ['a' for k in range(20)]
#         for j in xrange(20):
#             c[j] = chr(randint(97, 122))
#         content = ''.join(c)
#         Post.objects.create(
#             author=users[n],
#             title=title,
#             content=content,
#             uuid=get_post_uuid(),
#         )

