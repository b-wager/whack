# projectPals/urls.py
from django.urls import path
from app.views import HomePageView, RegistrationView, LoginView

urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('api/register/<str:user_type>/', RegistrationView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
]
