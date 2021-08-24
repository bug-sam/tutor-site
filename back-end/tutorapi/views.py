from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from .serializers import UserSerializer, TutorRequestSerializer
from .models import User, TutorRequest

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=True, url_path='check', methods=['post'])
    def password(self, request, pk=None):
        user = self.get_object()
        try:
            p = request.data['password']
            return Response({'ok': user.check_password(p)})
        except:
            return Response({'error': 'please send a password in the body of your request'})


class TutorRequestViewSet(viewsets.ModelViewSet):
    queryset = TutorRequest.objects.all()
    serializer_class = TutorRequestSerializer
