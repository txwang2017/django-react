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
    author_avatar = serializers.CharField(read_only=True, max_length=36)

    class Meta:
        model = Post
        fields = (
            'author',
            'title',
            'content',
            'pub_time',
            'comments',
            'comment_num',
            'like_num',
            'dislike_num',
            'author_avatar',
            'uuid',
        )
        read_only_fields = ('author', 'pub_time', 'link_num', 'dislike_num', 'uuid')


class PostsSerializer(serializers.ModelSerializer):

    author_avatar = serializers.CharField(max_length=36, read_only=True)

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
            'dislike_num',
            'author_avatar',
        )
        read_only_fields = ('author', 'pub_time', 'uuid')

    def create(self, validated_data):
        validated_data.update({'author': self.author})
        validated_data.update({'uuid': get_post_uuid()})
        return super(PostsSerializer, self).create(validated_data)
