from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import logout
from .models import User, UserLocation
from .serializer import UserSerializer, UserLocationSerializer
import base64

# Create your views here.
@api_view(['GET','PUT'])
@permission_classes([IsAuthenticated])
def UserAPIView(request, pk=None):
    print('login user')
    if request.method == 'GET':
        print('Get')
        user_id = request.user.id if pk==None else pk
        User_data = User.objects.get(id=user_id)
        User_data = UserSerializer(User_data)
        return Response(User_data.data)
    if request.method == 'PUT':
        print('PUT')
        User_data = User.objects.get(id=request.user.id)
        #print(request.data)
        serializer = UserSerializer(User_data, data=request.data, partial=True)
        print(serializer.initial_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        print(serializer.errors)
        return Response(serializer.errors, status=400)
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

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def UserLocationAPIView(request, pk=None):
    if request.method == 'GET':
        print('Get')
        if pk==None:
            UserLocation_data = UserLocation.objects.all()
            UserLocation_data = UserLocationSerializer(UserLocation_data, many=True)
            return Response(UserLocation_data.data)
        else:
            UserLocation_data = UserLocation.objects.filter(user=pk).first()
            #UserLocation_data = get_object_or_404(UserLocation, user=pk)
            UserLocation_data = UserLocationSerializer(UserLocation_data)
            return Response(UserLocation_data.data)
    
    elif request.method == 'POST':
        print('POST')
        UserLocation_data = UserLocation.objects.filter(user=request.data['user'])
        print(UserLocation_data.exists())
        if UserLocation_data.exists():
            serializer = UserLocationSerializer(UserLocation_data.first(), data=request.data)
        else:
            serializer = UserLocationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)

    return Response('No data', status=200)


