from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):

    token = serializers.CharField(max_length=255, read_only=True)
    avatar = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = (
            'username',
            'avatar',
            'token'
        )
        read_only_fields = ('username', 'avatar', 'token')

    def get_avatar(self, object):
        return object.avatar or 'default-avatar.jpg'
