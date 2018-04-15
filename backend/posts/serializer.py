from rest_framework import serializers
from django.conf import settings

from .models import Post, Comment
from .utils import get_post_uuid, create_comment, get_comment_uuid, get_post_comment_num

DEFAULT_AVATAR = 'default-avatar.jpg'


class CommentSerializer(serializers.ModelSerializer):

    author_avatar = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = (
            'author',
            'content',
            'pub_time',
            'author_avatar',
            'uuid',
        )
        read_only_fields = ('author', 'uuid', 'pub_time')

    def get_author_avatar(self, obj):
        avatar = obj.author.avatar
        return avatar or DEFAULT_AVATAR

    def create(self, validated_data):
        validated_data.update({'author': self.author})
        validated_data.update({'post': self.post})
        validated_data.update({'uuid': get_comment_uuid()})
        comment = create_comment(**validated_data)
        return comment


class PostSerializer(serializers.ModelSerializer):

    author_avatar = serializers.SerializerMethodField(read_only=True)
    comment_num = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Post
        fields = (
            'author',
            'title',
            'pub_time',
            'content',
            'uuid',
            'comment_num',
            'like_num',
            'read_num',
            'author_avatar',
            'icon',
        )
        read_only_fields = ('author', 'pub_time', 'uuid', 'read_num', 'like_num')

    def create(self, validated_data):
        validated_data.update({'author': self.author})
        validated_data.update({'uuid': get_post_uuid()})
        return super(PostSerializer, self).create(validated_data)

    def get_comment_num(self, obj):
        return get_post_comment_num(obj)

    def get_author_avatar(self, obj):
        avatar = obj.author.avatar
        return avatar or DEFAULT_AVATAR

