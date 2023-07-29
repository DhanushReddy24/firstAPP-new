from django.urls import path, include
from .views import Sample_1APIView,Sample_2APIView

app_name = 'sample'

urlpatterns = [
    path('sample_1/', Sample_1APIView, name='sample_1'),
    path('sample_2/', Sample_2APIView, name='sample_2'),
]