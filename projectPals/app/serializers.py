# app/serializers.py
from rest_framework import serializers
from .models import Student, Professor

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['email', 'full_name', 'date_of_birth', 'phone_number', 'password']

    def create(self, validated_data):
        student = Student(
            email=validated_data['email'],
            full_name=validated_data['full_name'],
            date_of_birth=validated_data['date_of_birth'],
            phone_number=validated_data['phone_number']
        )
        student.set_password(validated_data['password'])
        student.save()
        return student

class ProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professor
        fields = ['email', 'full_name', 'date_of_birth', 'phone_number', 'password']

    def create(self, validated_data):
        professor = Professor(
            email=validated_data['email'],
            full_name=validated_data['full_name'],
            date_of_birth=validated_data['date_of_birth'],
            phone_number=validated_data['phone_number']
        )
        professor.set_password(validated_data['password'])
        professor.save()
        return professor
