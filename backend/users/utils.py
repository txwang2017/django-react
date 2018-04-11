import boto3
import uuid

from backend.settings import AWS_BUCKET_NAME
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
    s3.Bucket(AWS_BUCKET_NAME).put_object(Key=uid, Body=avatar)
    user.avatar = uid
    user.save()
