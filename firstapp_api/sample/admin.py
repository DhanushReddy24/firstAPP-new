from django.contrib import admin
from .models import Sample_1,Sample_2

# Register your models here.
class Sample_1Admin(admin.ModelAdmin):
    list_display = ['id','username','firstname','lastname','age','address','created_at','image']
    search_fields = ['username', 'firstname'] 

class Sample_2Admin(admin.ModelAdmin):
    list_display = ['id','user','tweet','created_at']
    list_filter = ['user', 'tweet'] 

admin.site.register(Sample_1,Sample_1Admin)
admin.site.register(Sample_2,Sample_2Admin)