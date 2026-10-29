from django.shortcuts import render

# Калорийность продуктов (ккал на 100 г)
PRODUCTS = {
    'Овсяная каша': 88,
    'Гречка (отварная)': 110,
    'Рис (отварной)': 116,
    'Куриная грудка': 165,
    'Говядина': 250,
    'Яйцо': 155,
    'Творог 5%': 121,
    'Молоко 2.5%': 52,
    'Сыр Гауда': 356,
    'Яблоко': 52,
    'Банан': 89,
    'Апельсин': 43,
    'Картофель (отварной)': 87,
    'Огурец': 15,
    'Помидор': 18,
    'Хлеб белый': 265,
    'Греческий йогурт': 59,
    'Оливковое масло': 884,
}


def calories(request):
    """Счётчик калорий: пользователь выбирает продукты и указывает вес,
    представление считает суммарную калорийность приёма пищи."""
    total_kcal = None
    eaten = []  # выбранные продукты для отображения результата

    if request.method == 'POST':
        try:
            daily_limit = int(request.POST.get('daily_limit') or 2000)
        except ValueError:
            daily_limit = 2000

        for name, kcal_per_100g in PRODUCTS.items():
            grams = request.POST.get(f'grams_{name}')
            if not grams:
                continue
            try:
                grams = int(grams)
            except ValueError:
                continue
            if grams <= 0:
                continue
            kcal = round(kcal_per_100g * grams / 100)
            eaten.append({
                'name': name,
                'grams': grams,
                'kcal': kcal,
            })

        total_kcal = sum(item['kcal'] for item in eaten)
        left_kcal = daily_limit - total_kcal
        overspent = left_kcal < 0
        context = {
            'products': PRODUCTS,
            'eaten': eaten,
            'total_kcal': total_kcal,
            'daily_limit': daily_limit,
            'left_kcal': left_kcal,
            'over_by': -left_kcal if overspent else 0,
            'overspent': overspent,
        }
        return render(request, 'apps/calories.html', context)

    return render(request, 'apps/calories.html', {'products': PRODUCTS})
