from rest_framework import serializers

from .models import User, TutorRequest

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'bio', 'email')
        extra_kwargs = {'password': {'write_only': True}}

class TutorRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = TutorRequest
        fields = ('id', 'title', 'description', 'creator')
