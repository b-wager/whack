from django.urls import path
from .views import ProjectListCreateView, ProjectDetailView, ProjectMatchStudent

urlpatterns = [
    path('', ProjectListCreateView.as_view(), name='project-list-create'),
    path('<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),
    path('match/', ProjectMatchStudent.as_view(), name='project-get-match')
]
