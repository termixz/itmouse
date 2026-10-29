from urllib.parse import urlparse

from django.http.response import HttpResponseRedirect, HttpResponseNotFound
from django.shortcuts import render
from django.http import HttpResponse
from django.urls import reverse, resolve
from django.utils import timezone
import random

from sqlparse.filters import output

from itmouse.forms import *
from itmouse.models import *

sports = {
        "Андрей": "Футбол",
        "Павел": "Баскетбол",
        "Иван": "Тенис",
        "Леша": "Бадминтон",
        "Миша": "Воллейбол"
    }
students = {
        1: {
            "name": "Павел",
            "lname": "Иванов",
            "age": 14,
            "grade": "8B",
            "subjects": "Математика, Физика",
            "hobbies": "Программирование, Шахматы",
            "gpa": 4.8,
        },
        2: {
            "name": "Анна",
            "lname": "Смирнова",
            "age": 13,
            "grade": "7А",
            "subjects": "Английский язык, История",
            "hobbies": "Рисование, Плавание",
            "gpa": 4.5,
        },
        3: {
            "name": "Максим",
            "lname": "Петров",
            "age": 15,
            "grade": "9Б",
            "subjects": "Информатика, География",
            "hobbies": "Футбол, Гитара",
            "gpa": 4.2,
        },
    }
weathers = {
    1: {
        "city": "Токио",
        "temp": random.randint(-5, 35),
        "wind_speed": random.randint(1, 15),
        "humidity": random.randint(30, 90),
        "precipitation": random.randint(0, 50),
        "pressure": random.randint(745, 765),
    },
    2: {
        "city": "Москва",
        "temp": random.randint(-25, 30),
        "wind_speed": random.randint(2, 20),
        "humidity": random.randint(40, 95),
        "precipitation": random.randint(0, 30),
        "pressure": random.randint(735, 760),
    },
    3: {
        "city": "Нью-Йорк",
        "temp": random.randint(-10, 35),
        "wind_speed": random.randint(3, 25),
        "humidity": random.randint(35, 85),
        "precipitation": random.randint(0, 45),
        "pressure": random.randint(740, 765),
    },
    4: {
        "city": "Париж",
        "temp": random.randint(-2, 32),
        "wind_speed": random.randint(2, 18),
        "humidity": random.randint(40, 90),
        "precipitation": random.randint(0, 25),
        "pressure": random.randint(742, 768),
    },
    5: {
        "city": "Сидней",
        "temp": random.randint(5, 40),
        "wind_speed": random.randint(4, 30),
        "humidity": random.randint(25, 80),
        "precipitation": random.randint(0, 35),
        "pressure": random.randint(748, 766),
    },
}
def index(request):
    rands = random.choice(list(sports.keys()))
    student = random.choice(list(students.keys()))
    cityid = random.choice(list(weathers.keys()))
    citydata = weathers[cityid]
    people = Person.objects.all()
    context = {
        'rands': rands,
        'studentid': student,
        'studentname': students[student]['name'],
        'cityid': cityid,
        'cityname': citydata['city'],
        'people': people,
    }
    return render(request, 'myapp/index.html', context)
def create(request):
    referer = request.META.get('HTTP_REFERER')
    if referer:
        path = urlparse(referer).path
        try:
            match = resolve(path)
        except Exception:
            return HttpResponseRedirect('/')
        if match.url_name == 'index':
            if request.method == 'POST':
                client = Person()
                client.name = request.POST['name']
                client.age = request.POST['age']
                client.save()
                return HttpResponseRedirect('/')
            return HttpResponseRedirect('/')
        if match.url_name == 'books':
            if request.method == 'POST':
                form = BooksForm(request.POST)
                if form.is_valid():
                    form.save()
                    return HttpResponseRedirect('/books/')
            else:
                form = BooksForm()
            return render(request, 'myapp/books.html', {'books': Books.objects.all(), 'form': form})
    return HttpResponseRedirect('/')
def about(request):
    return render(request, 'myapp/about.html')
def contact(request):
    return render(request, 'myapp/contact.html')
def bank(request):
    n = 956
    p = 13
    y = 15
    f = round(n * (1 + p / 100) ** y)
    context = {
        'n': n,
        'p': p,
        'y': y,
        'f': f,
    }
    return render(request, 'myapp/bank.html', context)
def rand(request):
    num = random.randint(1, 100)
    if 1 <= num <= 30:
        color = 'green'
    elif 31 <= num <= 50:
        color = 'pink'
    elif 51 <= num <= 70:
        color = 'yellow'
    else:
        color = 'aquamarine'
    context = {
        'num': num,
        'color': color,
    }
    return render(request, 'myapp/rand.html', context)
def r(request):
    n = random.randint(1, 100)
    if 1 <= n <= 30:
        color = 'red'
        result = "Мешок яблок"
    elif 31 <= n <= 60:
        color = 'yellow'
        result = "Мешок картошки"
    elif 61 <= n <=75:
        color = 'pink'
        result = "Мешок мешков"
    elif 76 <= n <=90:
        color = 'pink'
        result = "Мешок конфет"
    else:
        color = 'green'
        result = "Автомобиль(игрушка)"
    context = {
        'result': result,
        'color': color,
    }
    return render(request, 'myapp/r.html', context)

def cat1(request, tovarID):
    tovarID = int(tovarID)
    if 0 < tovarID < 5:
        output = """
            <h2 style="background-color: pink; padding: 10px;">
                Вы попали в первую категорию товаров
            </h2>
            <a href="http://127.0.0.1:8000/index" style="background-color: aqua; border-radius: 10px; padding: 10px; margin: 10px 10px 10px 500px">На главную</a><br>
            """
    elif 4 < tovarID < 10:
        output = """
                <h2 style="background-color: green; padding: 10px;">
                    Вы попали во вторую категорию товаров
                </h2>
                <a href="http://127.0.0.1:8000/index" style="background-color: aqua; border-radius: 10px; padding: 10px; margin: 10px 10px 10px 500px">На главную</a><br>
                """
    else:
        output = """
        <h2>
                    Товар не найден
                </h2>
                <a href="http://127.0.0.1:8000/index" style="background-color: aqua; border-radius: 10px; padding: 10px; margin: 10px 10px 10px 500px">На главную</a><br>
         """
    return HttpResponse(output)
def seasons(request, n):
    n = int(n)
    if 0 < n < 3 or n == 12:
        context = {
            'color': 'aqua',
            'season': 'Зима'
        }
    elif 2 < n < 6:
        context = {
            'color': 'pink',
            'season': 'Весна'
        }
    elif 5 < n < 9:
        context = {
            'color': '#81ff9e',
            'season': 'Лето'
        }
    elif 8 < n < 12:
        context = {
            'color': 'orange',
            'season': 'Осень'
        }
    else:
        context = {
            'color': 'red',
            'season': 'Нет такой поры года'
        }
    return render(request, 'myapp/seasons.html', context)
def favSports(request, student):
    if student in sports:
        output = f"""
        <h1 style="background-color: beige; padding: 10px;">
        Любимый вид спорта ученика {student} - {sports[student]}
        </h1>
        <a href="http://127.0.0.1:8000/index" style="background-color: aqua; border-radius: 10px; padding: 10px; margin: 10px 10px 10px 500px">На главную</a><br>
        """
    else:
        return HttpResponseNotFound(f"""
    <h2 style="background-color: yellow; padding: 10px; width: 80vw; justify-content: center;">По запросу {student} ничего не найдено</h2>
    <a href="http://127.0.0.1:8000/index" style="background-color: aqua; border-radius: 10px; padding: 10px; margin: 10px 10px 10px 500px">На главную</a><br>
    """)
    return HttpResponse(output)
def pere(request):
    return HttpResponseRedirect('/contact')
def regular(request, reg):
    context = {
        'reg': reg,
        'result': eval(reg),
    }
    return render(request, 'myapp/regular.html', context)
def temperature(request, wid):
    wid = int(wid)
    context = {
        'wid': wid,
        'weather': weathers[wid],
    }
    return render(request, 'myapp/temperature.html', context)
def studentsfun(request, id):
    id = int(id)
    context = {
        'student': students[id],
    }
    return render(request, 'myapp/students.html', context)
def weather(request):
    context = {
        'id0': {
            'city': 'Lisbon',
            'temp': '21 °C',
            'image': 'sun.png',
            'color': '#2980b9'
        },
        'id1': {
            'city': 'Paris',
            'temp': '11 °C',
            'image': 'rainandsun.png',
            'color': '#16a085'
        },
        'id2': {
            'city': 'Belgrade',
            'temp': '15 °C',
            'image': 'cloud.png',
            'color': '#8e44ad'
        },
        'id3': {
            'city': 'Moscow',
            'temp': '21 °C',
            'image': 'cloud2.png',
            'color': '#c0392b'
        },
        'id4': {
            'city': 'Tel Aviv',
            'temp': '32 °C',
            'image': 'hot.png',
            'color': '#d35400'
        },
        'id5': {
            'city': 'Cair',
            'temp': '21 °C',
            'image': 'sun.png',
            'color': '#f39c12'
        },
        'id6': {
            'city': 'New York',
            'temp': '17 °C',
            'image': 'thunder.png',
            'color': '#7f8c8d'
        },
        'id7': {
            'city': 'New Delhi',
            'temp': '17 °C',
            'image': 'rain.png',
            'color': '#16a085'
        },
        'id8': {
            'city': 'San Francisco',
            'temp': '15 °C',
            'image': 'sun_cloud.png',
            'color': '#c2185b'
        },
        'id9': {
            'city': 'Tokyo',
            'temp': '8 °C',
            'image': 'moon.png',
            'color': '#27ae60'
        },
        'id10': {
            'city': 'Sydney',
            'temp': '25 °C',
            'image': 'sun_cloud.png',
            'color': '#5c6bc0'
        },
    }
    return render(request, 'myapp/weather.html', context)


def basket_view(request):
    all_products = {
        'Ноутбук': 2500,
        'Шнур': 50,
        'Веб-камера': 150,
        'Наушники': 45,
        'Сканер': 300,
        'Мышь': 80,
        'Клавиатура': 120,
        'Монитор': 600
    }

    selected_keys = random.sample(list(all_products.keys()), 5)
    cart_products = {key: all_products[key] for key in selected_keys}

    total_price = sum(cart_products.values())

    context = {
        'cart_products': cart_products,
        'total_price': total_price
    }

    return render(request, 'myapp/basket.html', context)
def form(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        age = request.POST.get('age')
        output = ("<h2>Пользователь</h2><h3>Имя - {0},""Возраст - {1}</h3>").format(name, age)
        return HttpResponse(output)
    else:
        userform = UserForm()
        return render(request, 'myapp/form.html', {'form': userform})


def form1(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        password = request.POST.get('password')
        output = ("""<h2>Submited Data:</h2><h3>Username: {0}<br>Password: {1}</h3>""").format(name, password)
        return render(request, 'myapp/form2.html', {'output': output})
    else:
        return render(request, 'myapp/form1.html')
def form3(request):
    userform = Form3()
    return render(request, 'myapp/form3.html', {'form': userform})
def form4(request):
    if request.method == 'POST':
        userform = Form4(request.POST)
        if userform.is_valid():
            data = userform.cleaned_data
            return render(request, 'myapp/form4.html', {'form': userform, 'data': data})
        return render(request, 'myapp/form4.html', {'form': userform})
    else:
        userform = Form4()
        return render(request, 'myapp/form4.html', {'form': userform})
def form5(request):
    if request.method == 'POST':
        userform = Form5(request.POST, request.FILES)
        if userform.is_valid():
            data = userform.cleaned_data
            return render(request, 'myapp/form5.html', {'form': userform, 'data': data})
        return render(request, 'myapp/form5.html', {'form': userform})
    else:
        userform = Form5()
        return render(request, 'myapp/form5.html', {'form': userform})
def books(request):
    books = Books.objects.all()
    form = BooksForm()
    return render(request, 'myapp/books.html', {'books': books, 'form': form})