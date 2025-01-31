from django.urls import path, include
from .views import JobAPIView

app_name = 'job'

urlpatterns = [
    path('job/', JobAPIView, name='job'),
    path('job/<int:pk>/', JobAPIView, name='job'),
]