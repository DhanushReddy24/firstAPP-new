from django.shortcuts import render, get_object_or_404
from authentication.models import User
from authentication.serializer import UserSerializer
from .models import Tweet,TweetReply,Message,TweetLike, Notification
from .serializer import TweetSerializer,TweetSerializer_Post,TweetReplySerializer,MessageSerializer,TweetLikeSerializer, NotificationSerializer, ProfileSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, Case, When, BooleanField, Subquery, OuterRef, Value, Q

def get_users(ids):
    users_data = User.objects.exclude(id__in=ids)
    users_data = UserSerializer(users_data, many=True)
    return users_data

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def TweetAPIView(request,user=None):
    if request.method == 'GET':
        if user==None:
            print('Get')
            tweetlike_ids_for_user = TweetLike.objects.filter(user=request.user).values('tweet')
            Tweet_data = Tweet.objects.annotate(
            is_like=Case(
                When(id__in=tweetlike_ids_for_user, then=TweetLike.objects.filter(Q(tweet=OuterRef('id')) & Q(user=request.user)).values('is_like')),
                default=False,
                output_field=BooleanField()
            ),
            is_dislike=Case(
                When(id__in=tweetlike_ids_for_user, then=TweetLike.objects.filter(Q(tweet=OuterRef('id')) & Q(user=request.user)).values('is_dislike')),
                default=False,
                output_field=BooleanField()
            )
            ).order_by('-created_at')
            Tweet_data = TweetSerializer(Tweet_data, many=True)
            return Response(Tweet_data.data, status=200)
        if user:
            print('Get')
            tweetlike_ids_for_user = TweetLike.objects.filter(user=request.user).values('tweet')
            Tweet_data = Tweet.objects.filter(user=user).annotate(
            is_like=Case(
                When(id__in=tweetlike_ids_for_user, then=TweetLike.objects.filter(Q(tweet=OuterRef('id')) & Q(user=request.user)).values('is_like')),
                default=False,
                output_field=BooleanField()
            ),
            is_dislike=Case(
                When(id__in=tweetlike_ids_for_user, then=TweetLike.objects.filter(Q(tweet=OuterRef('id')) & Q(user=request.user)).values('is_dislike')),
                default=False,
                output_field=BooleanField()
            )
            ).order_by('-created_at')
            Tweet_data = TweetSerializer(Tweet_data, many=True)
            return Response(Tweet_data.data, status=200)
        else:
            return Response('No data', status=200)
            

    elif request.method == 'POST':
        print('POST')
        serializer = TweetSerializer_Post(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        print('error: ',serializer.errors)
        return Response(serializer.errors, status=400)
    
    else:
        return Response('No data', status=200)

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def TweetReplyAPIView(request,pk):
    if request.method == 'GET':
        print('Get',pk)
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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def TweetCountAPIView(request):
    if request.method == 'GET':
        print('Get')
        Tweet_data = Tweet.objects.values('user').annotate(total=Count('id'))
        #Tweet_data = TweetSerializer(Tweet_data, many=True)
        return Response(Tweet_data)
    
    else:
        return Response('No data', status=200)

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def TweetLikeAPIView(request):
    if request.method == 'GET':
        print('Get')
        TweetLike_data = TweetLike.objects.filter(Q(user=request.user) & (Q(is_like=True) | Q(is_dislike=True)))
        TweetLike_data = TweetLikeSerializer(TweetLike_data, many=True)
        tweet_like = {}
        for tweetlike in TweetLike_data.data:
            tweet_like[tweetlike['tweet']]=[tweetlike['is_like'],tweetlike['is_dislike']]
        return Response(tweet_like)

    elif request.method == 'POST':
        print('POST')
        request_data = request.data.copy()
        if 'is_like' in request.data and request.data['is_like']:
            request_data['is_dislike'] = False
        if 'is_dislike' in request.data and request.data['is_dislike']:
            request_data['is_like'] = False
        TweetLike_data = TweetLike.objects.filter(Q(tweet=request.data['tweet']) & Q(user=request.data['user']))
        print(TweetLike_data.exists())
        if TweetLike_data.exists():
            serializer = TweetLikeSerializer(TweetLike_data.first(), data=request_data)
        else:
            serializer = TweetLikeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)
    
    else:
        return Response('No data', status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def TweetLikeCountAPIView(request):
    if request.method == 'GET':
        print('Get')
        tweet_like_counts = (TweetLike.objects.filter(is_like=True).values('tweet').annotate(like_count=Count('tweet')))
        tweet_likecount = {}
        for tweetlike in tweet_like_counts:
            tweet_likecount[tweetlike['tweet']]=tweetlike['like_count']
        return Response(tweet_likecount)

    else:
        return Response('No data', status=200)

@api_view(['GET','POST','PUT'])
@permission_classes([IsAuthenticated])
def NotificationAPIView(request):
    if request.method == 'GET':
        print('Get')
        Notification_data = Notification.objects.filter(Q(user=request.user) & Q(is_read=False)).order_by('-created_at')
        Notification_data = NotificationSerializer(Notification_data, many=True)
        return Response(Notification_data.data, status=200)

    elif request.method == 'POST':
        print('POST')
        serializer = NotificationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)
    
    elif request.method == 'PUT':
        print('PUT')
        Notification_data = Notification.objects.filter(id=request.data['id']).first()
        print(Notification_data.is_read)
        serializer = NotificationSerializer(Notification_data, data=request.data, partial=True)
        print(serializer.initial_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    else:
        return Response('No data', status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def NotificationCountAPIView(request):
    if request.method == 'GET':
        print('Get')
        Notification_data = Notification.objects.filter(Q(user=request.user) & Q(is_read=False))
        unread_count = Notification_data.count()
        return Response(unread_count, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def TweetDeleteAPIView(request, pk):
    if request.method == 'POST':
        print('POST')
        Tweet_data = Tweet.objects.get(id=pk)
        Tweet_data.delete()        
        return Response('No data', status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ProfileAPIView(request,user):
    if request.method == 'GET':
        print('Get')
        profile_data = User.objects.get(id=user)
        profile_data = ProfileSerializer(profile_data)
        return Response(profile_data.data, status=200)
    else:
        return Response('No data', status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def UserTweetStatsAPIView(request,user):
    if request.method == 'GET':
        print('Get')
        Tweets_Count = Tweet.objects.filter(user=user).count()
        Likes_Count = TweetLike.objects.filter(Q(tweet__user=user) & Q(is_like=True)).count()
        stats = {'posts':Tweets_Count, 'likes':Likes_Count}
        return Response(stats, status=200)
    
    else:
        return Response('No data', status=200)