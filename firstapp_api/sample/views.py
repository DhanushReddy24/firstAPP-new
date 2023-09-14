from django.shortcuts import render
from .models import Sample_1, Sample_2
from .serializer import Sample_1Serializer,Sample_2Serializer
from rest_framework.response import Response
from django.http import JsonResponse
import json
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated


@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def Sample_1APIView(request,pk=None):
    print(request.user.first_name)
    if request.method == 'GET':
        print('Get')
        if pk!=None:
            Sample_1_data = Sample_1.objects.filter(id=pk)
            Sample_1_data = Sample_1Serializer(Sample_1_data, many=True)
            return Response(Sample_1_data.data)
        else:
            Sample_1_data = Sample_1.objects.all()
            Sample_1_data = Sample_1Serializer(Sample_1_data, many=True)
            print(Sample_1_data.data)
            return Response(Sample_1_data.data)

    elif request.method == 'POST':
        print('POST')
        serializer = Sample_1Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)
    
    else:
        return Response('No data', status=200)

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def Sample_2APIView(request,pk=None):
    if request.method == 'GET':
        print('Get')
        if pk!=None:
            Sample_2_data = Sample_2.objects.filter(user=pk)
            Sample_2_data = Sample_2Serializer(Sample_2_data, many=True)
            return Response(Sample_2_data.data)
        else:
            Sample_2_data = Sample_2.objects.all()
            Sample_2_data = Sample_2Serializer(Sample_2_data, many=True)
            return Response(Sample_2_data.data)

    elif request.method == 'POST':
        print('POST')
        serializer = Sample_2Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)
    
    else:
        return Response('No data', status=200)


