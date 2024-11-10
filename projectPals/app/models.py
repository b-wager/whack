from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, Group, Permission


# Custom user manager
class CustomUserManager(BaseUserManager):
    """
    Custom user manager where email is the unique identifiers for authentication
    """

    def create_user(self, email: str, password: str, **kwargs: dict):
        """
        Create and return a regular user with an email and password.

        params:
            email: the email of the user
            password: the password of the user
            extra_fields: additional fields to set on the user

        returns:
            the created user
        """
        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user


class CustomUser(AbstractUser):
    """
    Custom user model with email as the unique identifier.
    """

    email = models.EmailField(unique=True)
    is_professor = models.BooleanField(default=False)
    username = models.CharField(max_length=150, blank=True, null=True)

    groups = models.ManyToManyField(
        Group,
        related_name="groups",  # Add related_name to avoid clash
        blank=True,
        help_text="The groups this user belongs to.",
        verbose_name="groups",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="permissions",  # Add related_name to avoid clash
        blank=True,
        help_text="Specific permissions for this user.",
        verbose_name="user permissions",
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


class StudentProfile(models.Model):
    """
    Student profile model
    """

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    def __str__(self):
        return str(self.name)


class ProfessorProfile(models.Model):
    """
    Professor profile model
    """

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    def __str__(self):
        return str(self.name)


class SurveyResponse(models.Model):
    """
    Survey response model
    """

    student = models.OneToOneField(StudentProfile, on_delete=models.CASCADE)

    # Survey questions
    topic_1_understanding = models.IntegerField(
        default=3, choices=[(i, str(i)) for i in range(5)]
    )
    topic_2_understanding = models.IntegerField(
        default=3, choices=[(i, str(i)) for i in range(5)]
    )
    topic_3_understanding = models.IntegerField(
        default=3, choices=[(i, str(i)) for i in range(5)]
    )
    effort = models.IntegerField(default=4, choices=[(i, str(i)) for i in range(7)])
    availability = models.JSONField(default=dict)

    def __str__(self):
        return f"Survey for {self.student.name}"
