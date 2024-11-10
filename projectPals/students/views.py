from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer
from rest_framework import permissions


class StudentListCreateView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class StudentDetailView(APIView):
    permission_classes = [AllowAny]
    # authentication_classes = [BasicAuthentication]
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        try:
            student = Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            return Response(status=404)
        serializer = StudentSerializer(student)
        return Response(serializer.data)

    def put(self, request, pk):
        self.permission_classes = [IsAuthenticated]
        try:
            student = Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            return Response(status=404)
        serializer = StudentSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def patch(self, request, pk):
        self.permission_classes = [IsAuthenticated]
        try:
            student = Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            return Response(status=404)
        serializer = StudentSerializer(student, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        self.permission_classes = [IsAuthenticated]
        try:
            student = Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            return Response(status=404)
        student.delete()
        return Response(status=204)
