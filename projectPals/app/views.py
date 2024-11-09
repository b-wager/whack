# app/views.py
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from django.shortcuts import render
from .models import Student, Professor
from .serializers import StudentSerializer, ProfessorSerializer

class HomePageView(APIView):
    def get(self, request):
        return render(request, 'home.html')
    
class RegistrationView(APIView):
    def post(self, request, user_type):
        if user_type == 'student':
            serializer = StudentSerializer(data=request.data)
        elif user_type == 'professor':
            serializer = ProfessorSerializer(data=request.data)
        else:
            return Response({"error": "Invalid user type."}, status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = Student.objects.get(email=email) if Student.objects.filter(email=email).exists() else Professor.objects.get(email=email)
        except (Student.DoesNotExist, Professor.DoesNotExist):
            return Response({"error": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)

        if user.check_password(password):
            return Response({"message": "Login successful!"}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)
