from django.contrib import admin
from django.urls import path, re_path
from itmouse import views
from apps.views import calories
from django.views.generic import TemplateView

urlpatterns = [
    path('', views.index, name='index'),
    path('books/', views.books, name='books'),
    path('create/', views.create, name='create'),
    path('admin/', admin.site.urls),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('bank/', views.bank, name='bank'),
    path('rand/', views.rand, name='rand'),
    path('r/', views.r, name='r'),
    path('pereadres/', views.pere, name='pere'),
    path('weather/', views.weather, name='weather'),
    path('registerform/', TemplateView.as_view(template_name='myapp/registerform.html'), name='registerform'),
    path('pizza/', TemplateView.as_view(
        template_name='myapp/pizza.html',
        extra_context={
            'id0': {
                'name': 'Маргарита',
                'description': 'Классическая пицца с томатным соусом и моцареллой',
                'cost': '25'
            },
            'id1': {
                'name': 'Пепперони',
                'description': 'Пицца с острыми колбасками пепперони и сыром',
                'cost': '33'
            },
            'id2': {
                'name': 'Вегетариансская',
                'description': 'Пицца с овощами и сыром фета',
                'cost': '34'
            },
            'id3': {
                'name': 'Четыре сыра',
                'description': 'Пицца с четырьмя видами сыра',
                'cost': '40'
            },
            'id4': {
                'name': 'С морепродуктами',
                'description': 'Пицца с креветками, мидиями и кальмарами',
                'cost': '50'
            },
        }
    ), name='pizza'),
    re_path(r'^tovar/(?P<tovarID>\d+)/$', views.cat1, name='cat1'),
    re_path(r'^student/(?P<id>\d+)/$', views.studentsfun, name='students'),
    re_path(r'^temperature/(?P<wid>\d+)/$', views.temperature, name='temperature'),
    re_path(r'^seasons/(?P<n>\d+)/$', views.seasons, name='seasons'),
    re_path(r'^favSport/(?P<student>\w+)/$', views.favSports, name='favSport'),
    re_path(r'^(?P<reg>[0-9+\-*/().\s]+)$', views.regular, name='regular'),
    path('h/', TemplateView.as_view(template_name="myapp/hero.html"), name='hero'),
    path('about1/', TemplateView.as_view(template_name="myapp/about1.html"), name='about1'),
    path('services/', TemplateView.as_view(template_name="myapp/services.html"), name='services'),
    path('contacts/', TemplateView.as_view(template_name="myapp/contacts.html"), name='contacts'),
    path('basket/', views.basket_view, name='basket'),
    path('form/', views.form, name='form'),
    path('form1/', views.form1, name='form1'),
    path('form3/', views.form3, name='form3'),
    path('form4/', views.form4, name='form4'),
    path('form5/', views.form5, name='form5'),
]