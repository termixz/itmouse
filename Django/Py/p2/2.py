text = input()

clean_text = ""
for char in text:
    code = ord(char)
    if 65 <= code <= 90:
        clean_text += chr(code + 32)
    elif 1040 <= code <= 1071:
        clean_text += chr(code + 32)
    elif code == 1025:
        clean_text += chr(1105)
    elif (48 <= code <= 57) or (97 <= code <= 122) or (1072 <= code <= 1103) or code == 1105:
        clean_text += char

is_palindrome = True
left = 0
right = 0

for _ in clean_text:
    right += 1
right -= 1

while left < right:
    if clean_text[left] != clean_text[right]:
        is_palindrome = False
        break
    left += 1
    right -= 1

if is_palindrome:
    print("Строка является палиндромом")
else:
    print("Строка не является палиндромом")
