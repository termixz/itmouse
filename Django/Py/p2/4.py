list1 = [1, 2, 3, 4, 5, 2]
list2 = [2, 4]

result = [item for item in list1 if item not in list2]
print(result)
