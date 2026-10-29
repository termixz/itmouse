c1 = input()
c2 = input()

valid = ["красный", "синий", "желтый"]

if c1 not in valid or c2 not in valid:
    print("ошибка")
elif c1 == c2:
    print(c1)
elif (c1 == "красный" and c2 == "синий") or (c1 == "синий" and c2 == "красный"):
    print("фиолетовый")
elif (c1 == "красный" and c2 == "желтый") or (c1 == "желтый" and c2 == "красный"):
    print("оранжевый")
elif (c1 == "синий" and c2 == "желтый") or (c1 == "желтый" and c2 == "синий"):
    print("зеленый")
