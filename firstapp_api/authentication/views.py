from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import logout
from .models import User
from .serializer import UserSerializer
import base64


# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def UserAPIView(request):
    print('login user')
    if request.method == 'GET':
        print('Get')
        User_data = User.objects.filter(id=request.user.id)
        User_data = UserSerializer(User_data, many=True)
        return Response(User_data.data[0])

    return Response('No data', status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def UsersAPIView(request):
    if request.method == 'GET':
        print('Get')
        User_data = User.objects.exclude(id__in=[request.user.id])
        User_data = UserSerializer(User_data, many=True)
        return Response(User_data.data)

    return Response('No data', status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def LogoutAPIView(request):
    print(request.user.first_name)
    logout(request)
    print('logout')
    return Response(status=status.HTTP_205_RESET_CONTENT)


