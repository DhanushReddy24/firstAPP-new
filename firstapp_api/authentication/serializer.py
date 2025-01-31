from rest_framework import serializers
from .models import User, UserLocation

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id','username','email','first_name','last_name','image']

class UserLocationSerializer(serializers.ModelSerializer):
    firstname = serializers.SerializerMethodField()

    class Meta:
        model = UserLocation
        fields = ['id','user','firstname','longitude','latitude','created_at']

    def get_firstname(self, obj):
        return obj.user.first_name
        