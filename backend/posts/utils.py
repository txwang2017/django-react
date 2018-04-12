import uuid
import boto3

from django.db.models import Q

from .models import Post, Comment
from backend.settings import AWS_BUCKET_NAME


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


def get_post(post_uuid=None):
    if post_uuid is None:
        return None
    try:
        post = Post.objects.get(uuid=post_uuid)
        return post
    except Post.DoesNotExist:
        return None


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


def upload_post_icon(icon, uuid):
    s3 = boto3.resource('s3')
    key = 'post-icon-' + uuid
    obj = s3.Bucket(AWS_BUCKET_NAME).put_object(Key=key, Body=icon)
    obj.Acl().put(ACL='public-read')