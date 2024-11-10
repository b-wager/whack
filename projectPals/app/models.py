# app/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        extra_fields.setdefault("is_student", True)
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    is_professor = models.BooleanField(default=False)
    username = models.CharField(max_length=150, blank=True, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


class Survey(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    topic1 = models.IntegerField()
    topic2 = models.IntegerField()
    topic3 = models.IntegerField()
    effort = models.IntegerField()
    availability = models.DateTimeField()
    questions = {
        "topic1": topic1,
        "topic2": topic2,
        "topic3": topic3,
        "effort": effort,
        "availability": availability,
    }


class StudentProfile(models.Model):
    objects = CustomUserManager()
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    responses = models.ManyToManyField(Survey, blank=True)


class ProfessorProfile(models.Model):
    objects = CustomUserManager()
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
