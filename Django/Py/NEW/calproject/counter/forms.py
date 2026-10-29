import datetime

from django import forms

from .models import FoodEntry, MealType


class FoodEntryForm(forms.ModelForm):
    date = forms.DateField(
        label="Дата",
        initial=datetime.date.today,
        widget=forms.DateInput(attrs={"type": "date"}),
        input_formats=["%Y-%m-%d"],
    )
    meal = forms.ChoiceField(
        label="Приём пищи",
        choices=MealType.choices,
        widget=forms.Select(attrs={"class": "inp"}),
    )

    class Meta:
        model = FoodEntry
        fields = ["name", "grams", "calories", "meal", "date"]
        widgets = {
            "name": forms.TextInput(attrs={"class": "inp", "placeholder": "Например: овсянка"}),
            "grams": forms.NumberInput(attrs={"class": "inp inp-sm", "min": 1}),
            "calories": forms.NumberInput(attrs={"class": "inp inp-sm", "min": 0}),
        }


class GoalForm(forms.Form):
    goal = forms.IntegerField(
        label="Дневная цель, ккал",
        min_value=0,
        widget=forms.NumberInput(attrs={"class": "inp inp-sm"}),
    )
    date = forms.DateField(
        widget=forms.DateInput(attrs={"type": "date"}),
        input_formats=["%Y-%m-%d"],
    )
