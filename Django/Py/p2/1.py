my_dict = {'a':500, 'b':5874, 'c': 560,'d':400, 'e':5874, 'f': 20}
items = []
for key, value in my_dict.items():
    items.append((key, value))
n = len(items)
for i in range(n):
    for j in range(0, n - i - 1):
        if items[j][1] < items[j + 1][1]:
            items[j], items[j + 1] = items[j + 1], items[j]
            
top = []
for i in range(3):
    top.append(items[i][0])
print(top)
