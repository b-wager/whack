from django import forms


class SurveyForm(forms.Form):
    def __init__(self, *args, **kwargs):
        survey = kwargs.pop("survey")
        super().__init__(*args, **kwargs)
        self.fields = survey.questions
