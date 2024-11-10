from django import forms
from .models import SurveyResponse


# 1. Login Form
class LoginForm(forms.Form):
    email = forms.EmailField(max_length=255)
    password = forms.CharField(widget=forms.PasswordInput)


# 2. Survey Form
class SurveyForm(forms.ModelForm):
    class Meta:
        model = SurveyResponse
        fields = [
            "topic_1_understanding",
            "topic_2_understanding",
            "topic_3_understanding",
            "effort",
            "availability",
        ]
