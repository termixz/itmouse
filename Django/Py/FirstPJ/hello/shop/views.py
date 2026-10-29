from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    html = """
    <h1>Main Page</h1>
    <p>
        Hello World!
    </p>
    """
    return HttpResponse(html)

def shop(request):
    html = """
    <h1>Добро пожаловать в наш интернет-магазин "Товары для дома"!</h1>
    <p>
        Мы рады приветствовать вас на нашем сайте, где вы найдете широкий ассортимент 
        товаров для вашего дома и уюта. Наша цель — сделать вашу жизнь комфортнее и приятнее, 
        предлагая только качественные и стильные изделия.
    </p>
    """
    return HttpResponse(html)

def item(request):
    html = """
    <h1>Диван "Элегант"</h1>
    <p>Цена: 1000 руб.</p>
    <p>Описание:</p>
    <p>
        Диван "Элегант" — это идеальное сочетание стиля, комфорта и функциональности. 
        Он станет центральным элементом вашего интерьера и создаст атмосферу уюта в любой комнате.
    </p>
    """
    return HttpResponse(html)

def phone(request):
    html = """
    <h1>Наш номер:</h1>
    <ul>
        <li>+7 (495) 123-45-67</li>
        <li>+7 (912) 345-67-89</li>
        <li>8 (800) 123-45-67 (бесплатный номер)</li>
    </ul>
    """
    return HttpResponse(html)