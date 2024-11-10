from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from .models import CustomUser, StudentProfile, SurveyResponse
from .forms import LoginForm, SurveyForm


# 1. Login View
def login_view(request):
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data["email"]
            password = form.cleaned_data["password"]

            # Check if the user exists with the given email
            user = authenticate(request, email=email, password=password)

            if user is not None:
                # If the user exists and the password matches, log them in
                login(request, user)
                return redirect("dashboard")
            else:
                # If no user exists, create a new user
                try:
                    user = CustomUser.objects.create_user(email, password)
                    login(request, user)
                    return redirect(
                        "survey"
                    )  # Redirect to the survey page if it's a new user
                except Exception as e:
                    form.add_error(None, f"Error creating user: {e}")
    else:
        form = LoginForm()

    return render(request, "login.html", {"form": form})


# 2. Logout View
@login_required
def logout_view(request):
    logout(request)
    return redirect("login")


# 3. Dashboard View
@login_required
def dashboard(request):
    if request.user.is_professor:
        return redirect("professor_dashboard")  # Placeholder for professor's dashboard

    # Check if student has completed the survey
    try:
        student_profile = StudentProfile.objects.get(user=request.user)
        if not hasattr(student_profile, "surveyresponse"):
            return redirect("survey")
    except StudentProfile.DoesNotExist:
        return HttpResponse("Student profile not found.")

    return render(request, "dashboard.html")


# 4. Survey View
@login_required
def survey_view(request):
    try:
        student_profile = StudentProfile.objects.get(user=request.user)
    except StudentProfile.DoesNotExist:
        return HttpResponse("Student profile not found.")

    if hasattr(student_profile, "surveyresponse"):
        return redirect("dashboard")  # Survey already completed

    if request.method == "POST":
        form = SurveyForm(request.POST)
        if form.is_valid():
            SurveyResponse.objects.create(student=student_profile, **form.cleaned_data)
            return redirect("matching")
    else:
        form = SurveyForm()

    return render(request, "survey.html", {"form": form})


# 5. Matching View
@login_required
def matching_view(request):
    try:
        student_profile = StudentProfile.objects.get(user=request.user)
        survey_response = student_profile.surveyresponse
    except (StudentProfile.DoesNotExist, SurveyResponse.DoesNotExist):
        return redirect("survey")

    # Placeholder logic for matching (to be implemented)
    return render(request, "matching.html", {"response": survey_response})
