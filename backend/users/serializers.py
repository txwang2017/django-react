from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'email',
            'avatar',
        )
        read_only_fields = ('email', 'avatar')
