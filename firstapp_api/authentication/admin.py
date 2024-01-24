from django.contrib import admin
from .models import User, UserLocation

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ['id','username','first_name','last_name','email','image']

admin.site.register(User,UserAdmin)

class UserLocationAdmin(admin.ModelAdmin):
    list_display = [field.name for field in UserLocation._meta.get_fields()]

admin.site.register(UserLocation,UserLocationAdmin)