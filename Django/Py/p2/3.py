def bank(a, years):
    for _ in range(years):
        a *= 1.1
    return a

rubles = int(input("рублей: "))
years = int(input("лет: "))

print(bank(rubles, years))
