import boto3
import uuid

from django.conf import settings

from .models import User


def get_avatar_uuid():
    uid = str(uuid.uuid4())
    while 1:
        try:
            User.objects.get(avatar=uid)
            uid = str(uuid.uuid4())
        except User.DoesNotExist:
            return uid


def upload_avatar(avatar, user):
    s3 = boto3.resource('s3')
    uid = get_avatar_uuid()
    obj = s3.Bucket(settings.AWS_BUCKET_NAME).put_object(Key=uid, Body=avatar)
    obj.Acl().put(ACL='public-read')
    user.avatar = uid
    user.save()
