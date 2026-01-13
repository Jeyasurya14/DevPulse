from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', required=False)
    last_name = serializers.CharField(source='user.last_name', required=False)
    is_staff = serializers.BooleanField(source='user.is_staff', read_only=True)

    class Meta:
        model = Profile
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'avatar_url', 'bio', 'is_staff']

    def update(self, instance, validated_data):
        # Update User fields if present
        user_data = {}
        if 'user' in validated_data:
            user_data = validated_data.pop('user')
            
        # We manually extracted user.first_name/last_name above so they might not be in 'user' dict if source handled it differently
        # But source='user.first_name' usually implies nested update. 
        # Actually, DRF nested update is tricky.
        # Let's simple handle explicit fields.
        
        user = instance.user
        if 'first_name' in self.initial_data:
             user.first_name = self.initial_data.get('first_name', user.first_name)
        if 'last_name' in self.initial_data:
             user.last_name = self.initial_data.get('last_name', user.last_name)
        user.save()

        # Update Profile fields
        instance.avatar_url = validated_data.get('avatar_url', instance.avatar_url)
        instance.bio = validated_data.get('bio', instance.bio)
        instance.save()
        return instance

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
