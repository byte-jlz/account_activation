from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the Django User model"""
    
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']


class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for the UserProfile model"""
    
    user = UserSerializer(read_only=True)
    username = serializers.CharField(write_only=True, required=False)
    first_name = serializers.CharField(write_only=True, required=False)
    last_name = serializers.CharField(write_only=True, required=False)
    
    class Meta:
        model = UserProfile
        fields = [
            'id', 'user', 'username', 'first_name', 'last_name',
            'age', 'blood_type', 'height', 'weight', 'gender'
        ]
        read_only_fields = ['id', 'user']
    
    def update(self, instance, validated_data):
        # Update user fields if provided
        user_data = {}
        if 'username' in validated_data:
            user_data['username'] = validated_data.pop('username')
        if 'first_name' in validated_data:
            user_data['first_name'] = validated_data.pop('first_name')
        if 'last_name' in validated_data:
            user_data['last_name'] = validated_data.pop('last_name')
        
        if user_data:
            User.objects.filter(pk=instance.user.pk).update(**user_data)
            # Refresh instance to get updated user data
            instance.refresh_from_db()
        
        # Update profile fields
        return super().update(instance, validated_data)
