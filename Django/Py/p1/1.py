n = int(input())

res = []
current = 1

while len(res) < n:
    for i in range(current):
        res.append(current)
        if len(res) == n:
            break
    current += 1

print(*res)
