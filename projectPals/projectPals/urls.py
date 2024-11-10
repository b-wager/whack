# # projectPals/urls.py
# from django.urls import path
# from app.views import HomePageView, RegistrationView, LoginView

# urlpatterns = [
#     path('', HomePageView.as_view(), name='home'),
#     path('api/register/<str:user_type>/', RegistrationView.as_view(), name='register'),
#     path('api/login/', LoginView.as_view(), name='login'),
# ]

from django.urls import path
from app.views import (
    login_view,
    logout_view,
    dashboard,
    survey_view,
    matching_view,
)


urlpatterns = [
    path("login/", login_view, name="login"),
    path("logout/", logout_view, name="logout"),
    path("dashboard/", dashboard, name="dashboard"),
    path("survey/", survey_view, name="survey"),
    path("matching/", matching_view, name="matching"),
]
