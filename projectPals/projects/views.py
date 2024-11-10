import random

import numpy as np
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Project
from .serializers import ProjectSerializer
from students.models import Student
from .project_match import ProjectMatch


class ProjectListCreateView(APIView):
    def get(self, request):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProjectDetailView(APIView):
    def get(self, request, pk):
        try:
            project = Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ProjectSerializer(project)
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            project = Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ProjectSerializer(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            project = Project.objects.get(pk=pk)
            project.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    

class ProjectMatchStudent(APIView):
    def create_profile(self, student):
        return {
            "name": student.first_name,
            # "skill1": [random.randint(1, 9)],  # Fixed random.sample
            # "skill2": [random.randint(1, 9)],
            # "outcome": [random.randint(1, 9)],
            "stats": np.array([random.randint(1, 9),random.randint(1, 9), random.randint(1, 9)])
        }

    def get(self, request):
        try:
            all_profiles = []
            all_students = Student.objects.all()

            for st in all_students:
                all_profiles.append(self.create_profile(st))

            match = ProjectMatch()  # This creates an instance, which is fine
            for profile in all_profiles:
                match.add_profile(profile)

            pairs, unpaired_names, total_compatibility_score, avg_score = match.find_optimal_pairs()

            return Response({
                'pairs': pairs,
                'unpaired_names': unpaired_names,
                'total_compatibility_score': total_compatibility_score,
                'avg_score': avg_score
            })

        except Exception as e:
            print(e)
            return Response({'error': 'An error occurred while processing the match.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)