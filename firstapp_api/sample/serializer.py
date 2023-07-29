from rest_framework import serializers
from .models import Sample_1,Sample_2

class Sample_1Serializer(serializers.ModelSerializer):
    
    class Meta:
        model = Sample_1
        fields = '__all__'

class Sample_2Serializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    firstname = serializers.SerializerMethodField()
    
    class Meta:
        model = Sample_2
        fields = ['id','user','tweet','username','firstname','created_at']

    def get_username(self, obj):
        return obj.user.username

    def get_firstname(self, obj):
        return obj.user.firstname