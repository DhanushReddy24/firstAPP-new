from django.shortcuts import render
from authentication.models import User
from authentication.serializer import UserSerializer
from .models import Job
from .serializer import JobSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, Case, When, BooleanField, Subquery, OuterRef, Value, Q

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def JobAPIView(request):
    if request.method == 'GET':
        print('Get')
        Job_data = Job.objects.all()
        Job_data = JobSerializer(Job_data, many=True)
        return Response(Job_data.data, status=200)

    elif request.method == 'POST':
        print('POST')
        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)
    
    else:
        return Response('No data', status=200)