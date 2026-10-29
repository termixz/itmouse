from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("add/", views.add, name="add"),
    path("delete/<int:pk>/", views.delete, name="delete"),
    path("goal/", views.set_goal, name="set_goal"),
]
