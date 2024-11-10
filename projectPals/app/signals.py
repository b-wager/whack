from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import CustomUser, StudentProfile, ProfessorProfile


# Signal to create StudentProfile or ProfessorProfile after CustomUser is saved
@receiver(post_save, sender=CustomUser)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        # Check the type of user and create the corresponding profile
        if instance.is_professor:
            ProfessorProfile.objects.create(user=instance, name=instance.email)
        else:
            StudentProfile.objects.create(user=instance, name=instance.email)


@receiver(post_save, sender=CustomUser)
def save_user_profile(sender, instance, **kwargs):
    # Save the profile (if it exists)
    if hasattr(instance, "studentprofile"):
        instance.studentprofile.save()
    elif hasattr(instance, "professorprofile"):
        instance.professorprofile.save()
