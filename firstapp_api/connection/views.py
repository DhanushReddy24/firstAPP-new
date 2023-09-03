from django.shortcuts import render
from authentication.models import User
from authentication.serializer import UserSerializer
from .models import Tweet,TweetReply,Message
from .serializer import TweetSerializer,TweetReplySerializer,MessageSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated

def get_users(ids):
    users_data = User.objects.exclude(id__in=ids)
    users_data = UserSerializer(users_data, many=True)
    return users_data

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def TweetAPIView(request):
    if request.method == 'GET':
        print('Get')
        Tweet_data = Tweet.objects.all()
        Tweet_data = TweetSerializer(Tweet_data, many=True)
        return Response(Tweet_data.data)

    elif request.method == 'POST':
        print('POST')
        serializer = TweetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)
    
    else:
        return Response('No data', status=200)

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def TweetReplyAPIView(request,pk):
    if request.method == 'GET':
        print('Get')
        TweetReply_data = TweetReply.objects.filter(tweet=pk)
        TweetReply_data = TweetReplySerializer(TweetReply_data, many=True)
        return Response(TweetReply_data.data)

    elif request.method == 'POST':
        print('POST')
        serializer = TweetReplySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)
    
    else:
        return Response('No data', status=200)


@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def MessageAPIView(request,pk):
    if request.method == 'GET':
        print('Get')
        print(pk,request.user.id)
        Message_data_receiver = Message.objects.filter(user=pk).filter(opp_user=request.user.id)
        Message_data_sender = Message.objects.filter(opp_user=pk).filter(user=request.user.id)
        Message_data = Message_data_sender.union(Message_data_receiver)
        Message_data = Message_data.order_by('created_at')
        Message_data = MessageSerializer(Message_data, many=True)
        '''
        users_data = get_users([pk,request.user.id])
        
        response_data = {
            'Message_data' : Message_data.data,
            'users_data' : users_data.data
        }
        '''
        return Response(Message_data.data)

    elif request.method == 'POST':
        print('POST')
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)
    
    else:
        return Response('No data', status=200)
