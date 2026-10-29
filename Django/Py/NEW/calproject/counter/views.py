import datetime

from django.shortcuts import render, redirect, get_object_or_404
from django.db.models import Sum
from django.utils.dateparse import parse_date
from django.views.decorators.http import require_POST

from .models import FoodEntry, DailyGoal, MealType
from .forms import FoodEntryForm, GoalForm


def today_str():
    return datetime.date.today().isoformat()


def _get_date(request):
    d = request.GET.get("date") or request.POST.get("date")
    parsed = parse_date(d) if d else None
    return parsed or datetime.date.today()


def _get_goal(date):
    obj = DailyGoal.objects.filter(date=date).first()
    return obj.goal if obj else 2000


def index(request):
    date = _get_date(request)
    entries = FoodEntry.objects.filter(date=date)
    total = entries.aggregate(s=Sum("calories"))["s"] or 0
    goal = _get_goal(date)

    by_meal = []
    for key, label in MealType.choices:
        qs = entries.filter(meal=key)
        by_meal.append({
            "key": key,
            "label": label,
            "entries": list(qs),
            "total": qs.aggregate(s=Sum("calories"))["s"] or 0,
        })

    week = []
    for i in range(6, -1, -1):
        d = date - datetime.timedelta(days=i)
        s = FoodEntry.objects.filter(date=d).aggregate(t=Sum("calories"))["t"] or 0
        week.append({"date": d, "total": s})

    last = FoodEntry.objects.order_by("-date").values_list("date", flat=True).first()

    return render(request, "counter/index.html", {
        "date": date,
        "prev_date": (date - datetime.timedelta(days=1)).isoformat(),
        "next_date": (date + datetime.timedelta(days=1)).isoformat(),
        "is_today": date == datetime.date.today(),
        "entries": entries,
        "by_meal": by_meal,
        "total": total,
        "goal": goal,
        "left": max(goal - total, 0),
        "over": max(total - goal, 0),
        "progress": min(round(total / goal * 100), 100) if goal else 0,
        "week": week,
        "last_date": last.isoformat() if last else today_str(),
        "form": FoodEntryForm(initial={"date": date}),
        "goal_form": GoalForm(initial={"goal": goal, "date": date}),
        "meal_choices": MealType.choices,
    })


@require_POST
def add(request):
    form = FoodEntryForm(request.POST)
    if form.is_valid():
        entry = form.save()
        return redirect(f"/?date={entry.date.isoformat()}")
    return redirect("/")


@require_POST
def delete(request, pk):
    entry = get_object_or_404(FoodEntry, pk=pk)
    date = entry.date.isoformat()
    entry.delete()
    return redirect(f"/?date={date}")


@require_POST
def set_goal(request):
    form = GoalForm(request.POST)
    if form.is_valid():
        DailyGoal.objects.update_or_create(
            date=form.cleaned_data["date"],
            defaults={"goal": form.cleaned_data["goal"]},
        )
        return redirect(f"/?date={form.cleaned_data['date'].isoformat()}")
    return redirect("/")
