def calculator():
    print("Консольный калькулятор (для выхода введите 'exit')")
    
    while True:
        user_input = input("\nВведите выражение (например, 2 + 2): ")
        
        if user_input.lower() == 'exit':
            break
            
        try:
            # eval() вычисляет строку как выражение Python
            result = eval(user_input)
            print(f"Результат: {result}")
        except ZeroDivisionError:
            print("Ошибка: Деление на ноль!")
        except Exception as e:
            print(f"Ошибка ввода: {e}")

if __name__ == "__main__":
    calculator()
