from rest_framework import serializers
from .models import User, UserLocation

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id','username','email','first_name','last_name','image']

class UserLocationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserLocation
        fields = ['id','user','longitude','latitude','created_at']