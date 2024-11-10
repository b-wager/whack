from django.db import models
from courses.models import Course
from students.models import Student

class Project(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    course = models.ForeignKey(Course, related_name='projects', on_delete=models.CASCADE)
    students = models.ManyToManyField(Student, related_name='projects')
