# app/models.py
from django.db import models
import bcrypt

class User(models.Model):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    phone_number = models.CharField(max_length=15)
    password = models.CharField(max_length=128)

    class Meta:
        abstract = True

    def set_password(self, raw_password):
        hashed = bcrypt.hashpw(raw_password.encode('utf-8'), bcrypt.gensalt())
        self.password = hashed.decode('utf-8')

    def check_password(self, raw_password):
        return bcrypt.checkpw(raw_password.encode('utf-8'), self.password.encode('utf-8'))

class Student(User):
    pass  # Additional fields for students if needed

class Professor(User):
    pass  # Additional fields for professors if needed
