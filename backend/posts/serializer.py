from rest_framework import serializers

from .models import Post, Comment
from .utils import get_post_uuid, create_comment, get_comment_uuid


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = (
            'author',
            'content',
            'pub_time',
            'uuid',
        )
        read_only_fields = ('author', 'uuid', 'pub_time')

    def create(self, validated_data):
        validated_data.update({'author': self.author})
        validated_data.update({'post': self.post})
        validated_data.update({'uuid': get_comment_uuid()})
        comment = create_comment(**validated_data)
        return comment


class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = (
            'author',
            'title',
            'content',
            'pub_time',
            'comments',
        )
        read_only_fields = ['author', 'pub_time']


class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = (
            'author',
            'title',
            'pub_time',
            'content',
            'uuid'
        )
        read_only_fields = ('author', 'pub_time', 'uuid')
        extra_kwargs = {'content': {'write_only': True}}

    def create(self, validated_data):
        validated_data.update({'author': self.author})
        validated_data.update({'uuid': get_post_uuid()})
        return super(PostsSerializer, self).create(validated_data)
