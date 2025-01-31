from django.contrib import admin
from .models import Job

# Register your models here.
class JobAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Job._meta.get_fields()]

admin.site.register(Job,JobAdmin)
