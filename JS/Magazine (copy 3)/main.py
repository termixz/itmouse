import logging
import asyncio
import os
import sys
import aiohttp
import aiofiles  
from aiogram import Bot, Dispatcher, types, F
from aiogram.filters import Command
from aiogram.types import Message, ReplyKeyboardMarkup, KeyboardButton

API_TOKEN = '7566646974:AAGURYOEoG456OHUrLSYv-lbnvzrTSn_EYk'
ADMIN_ID = 2116581879
OLLAMA_URL = "http://127.0.0.1:11436/api/generate"

bot = Bot(token=API_TOKEN)
dp = Dispatcher()

SITE_FILES = ['index.html', 'style.css', 'scripts.js', 'house.js', 'profile.js']

async def load_site_files() -> str:
    result = "ФАЙЛЫ САЙТА:\n"
    for filename in SITE_FILES:
        try:
            async with aiofiles.open(filename, 'r', encoding='utf-8') as f:
                content = await f.read()
                result = result + "\n--- " + filename + " ---\n" + content + "\n"
        except Exception as e:
            result = result + "\n--- " + filename + " ---\n[Ошибка чтения: " + str(e) + "]\n"
    return result

BASE_SYSTEM_PROMPT = """Ты — официальный ИИ-помощник сайта "ДОМА НЕДОРОГО\u200b.by". 
1. ОТВЕЧАЙ ТОЛЬКО НА РУССКОМ ЯЗЫКЕ.
2. Пиши кратко и по делу.
3. Не пиши пользователю об файлах сайта.
4. Пиши без энтузиазма, просто сухой текст.
5. Чтобы купить дом: выбрать на главной, нажать "Подробнее", если хватает денег в профиле — нажать "Купить", Нету выбора дом, квартира и тд.
6. Чтобы продать дом: в профиле кнопка "перепродать" или "Разместить объявление" на главной.
Желай удачного пользования сайтом ДОМА НЕДОРОГО\u200b.by."""

async def get_full_system_prompt() -> str:
    files_content = await load_site_files()
    return files_content + "\n\n" + BASE_SYSTEM_PROMPT

main_kb = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text="ИИ Поддержка"), KeyboardButton(text="Связь с админом")]
    ],
    resize_keyboard=True
)

user_modes = {}

@dp.message(Command("start"))
async def send_welcome(message: Message):
    user_modes[message.chat.id] = None
    await message.reply(
        "Добро пожаловать в поддержку ДОМА НЕДОРОГО\u200b.by. Выберите тип обращения:",
        reply_markup=main_kb
    )

@dp.message(F.text == "ИИ Поддержка")
async def set_ai_mode(message: Message):
    user_modes[message.chat.id] = "ai"
    await message.answer("Режим ИИ включен. Задайте свой вопрос.", reply_markup=main_kb)

@dp.message(F.text == "Связь с админом")
async def set_admin_mode(message: Message):
    user_modes[message.chat.id] = "admin"
    await message.answer("Напишите сообщение администратору, и он скоро ответит.", reply_markup=main_kb)

@dp.message(F.text)
async def handle_messages(message: Message):
    mode = user_modes.get(message.chat.id)

    if mode == "ai":
        status_msg = await message.answer("...")
        try:
            full_system_prompt = await get_full_system_prompt()
            async with aiohttp.ClientSession() as session:
                payload = {
                    "model": "llama3",
                    "prompt": full_system_prompt + "\nПользователь: " + message.text,
                    "stream": False,
                    "options": {"temperature": 0.1}
                }
                async with session.post(OLLAMA_URL, json=payload) as response:
                    result = await response.json()
                    await status_msg.edit_text(result.get("response", "Ошибка ответа."))
        except Exception as e:
            await status_msg.edit_text("Ошибка связи с ИИ: " + str(e))

    elif mode == "admin" and message.chat.id != ADMIN_ID:
        await bot.send_message(ADMIN_ID, f"Сообщение от @{message.from_user.username}:")
        await message.forward(ADMIN_ID)
        await message.reply("Сообщение доставлено администратору.")

    elif message.reply_to_message and message.chat.id == ADMIN_ID:
        if message.reply_to_message.forward_from:
            user_id = message.reply_to_message.forward_from.id
            await bot.send_message(user_id, f"Ответ администратора:\n\n{message.text}")
            await message.reply("Отправлено.")

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    asyncio.run(main())
