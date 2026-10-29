from django.db import models


class MealType(models.TextChoices):
    BREAKFAST = "breakfast", "Завтрак"
    LUNCH = "lunch", "Обед"
    DINNER = "dinner", "Ужин"
    SNACK = "snack", "Перекус"


class FoodEntry(models.Model):
    name = models.CharField("Продукт", max_length=120)
    grams = models.PositiveIntegerField("Граммы", default=100)
    calories = models.PositiveIntegerField("Калории (ккал)")
    meal = models.CharField(
        "Приём пищи",
        max_length=20,
        choices=MealType.choices,
        default=MealType.BREAKFAST,
    )
    date = models.DateField("Дата", db_index=True)
    created_at = models.DateTimeField("Создано", auto_now_add=True)

    class Meta:
        ordering = ["-date", "created_at"]
        verbose_name = "Запись о еде"
        verbose_name_plural = "Записи о еде"

    def __str__(self):
        return f"{self.name} ({self.calories} ккал, {self.date})"


class DailyGoal(models.Model):
    date = models.DateField("Дата", unique=True)
    goal = models.PositiveIntegerField("Дневная цель, ккал", default=2000)

    class Meta:
        verbose_name = "Дневная цель"
        verbose_name_plural = "Дневные цели"

    def __str__(self):
        return f"{self.date}: {self.goal} ккал"
