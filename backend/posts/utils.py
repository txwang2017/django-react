import uuid
import boto3

from django.db.models import Q
from django.conf import settings
from django.db import transaction

from .models import Post, Comment


def get_all_posts():
    return Post.objects.all()


def get_post_uuid():
    posts_set = get_all_posts()
    while True:
        _uuid = uuid.uuid4()
        if not posts_set.filter(uuid=_uuid):
            return _uuid


def get_comment_uuid():
    comment_set = Comment.objects.all()
    while True:
        _uuid = uuid.uuid4()
        if not comment_set.filter(uuid=_uuid):
            return _uuid


def get_post(post_uuid=None, read_inc=False):
    if read_inc:
        with transaction.atomic():
            post = Post.objects.select_for_update().filter(uuid=post_uuid).first()
            if post:
                post.read_num += 1
                post.save()
    else:
        post = Post.objects.filter(uuid=post_uuid).first()
    return post


def get_comments_by_post(post=None):
    if post is None:
        return []
    comments = Comment.objects.all().filter(post=post)
    return comments


def filter_posts(queryset, keywords):
    keywords = keywords.split(' ')
    posts_filter = Q()
    for kw in keywords:
        if kw:
            posts_filter = posts_filter & Q(title__contains=kw)
    return queryset.filter(posts_filter)


def create_comment(**kwargs):
    return Comment.objects.create(**kwargs)


def upload_post_icon(icon, uid):
    s3 = boto3.resource('s3')
    key = 'post-icon-' + uid
    obj = s3.Bucket(settings.AWS_BUCKET_NAME).put_object(Key=key, Body=icon)
    obj.Acl().put(ACL='public-read')
    post = get_post(post_uuid=uid)
    if post:
        post.icon = True
        post.save()


def get_post_comment_num(post):
    comment_num = Comment.objects.filter(post=post).count()
    return comment_num


def inc_post_link_num(post_uuid):
    with transaction.atomic():
        post = Post.objects.select_for_update().filter(uuid=post_uuid).first()
        post.like_num += 1
        post.save()
