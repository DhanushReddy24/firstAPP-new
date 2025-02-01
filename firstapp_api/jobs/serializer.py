from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    firstname = serializers.SerializerMethodField()
    class Meta:
        model = Job
        fields = ['id','user', 'firstname','company','description','jobType','location','salary','title', 'created_at']
    
    def get_firstname(self, obj):
        return obj.user.first_name