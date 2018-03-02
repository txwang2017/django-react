from rest_framework import serializers

from .utils import create_user
from .models import User


class SignUpSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(max_length=64, write_only=True)
    password2 = serializers.CharField(max_length=64, write_only=True)

    class Meta:
        model = User
        fields = (
            'username',
            'email',
            'password1',
            'password2',
        )

    def save(self, **kwargs):
        password1 = self.validated_data.get('password1')
        data = dict(self.validated_data)
        data.update({'password': password1})
        return create_user(**data)


class SignInSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'email',
            'password',
        )
        extra_kwargs = {'password': {'write_only': True}}

    email = serializers.EmailField()


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'email',
        )
        read_only_fields = ('email',)
