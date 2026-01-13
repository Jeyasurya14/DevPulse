from rest_framework import serializers
from django.contrib.auth.models import User

class AdminUserSerializer(serializers.ModelSerializer):
    date_joined = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    last_login = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff', 'is_active', 'date_joined', 'last_login']
