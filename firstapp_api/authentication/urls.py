from django.urls import path, include
from .views import LogoutAPIView,UserAPIView,UsersAPIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name = 'authentication'

urlpatterns = [
    path('auth/', include('djoser.urls')),
    #path('auth/', include('djoser.urls.jwt')),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutAPIView, name='logout'),
    path('details/', UserAPIView, name='details'),
    path('users/', UsersAPIView, name='users'),
]