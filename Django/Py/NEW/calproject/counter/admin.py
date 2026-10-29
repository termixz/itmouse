from django.contrib import admin

from .models import FoodEntry, DailyGoal


@admin.register(FoodEntry)
class FoodEntryAdmin(admin.ModelAdmin):
    list_display = ("name", "calories", "grams", "meal", "date")
    list_filter = ("meal", "date")
    search_fields = ("name",)
    date_hierarchy = "date"


@admin.register(DailyGoal)
class DailyGoalAdmin(admin.ModelAdmin):
    list_display = ("date", "goal")
