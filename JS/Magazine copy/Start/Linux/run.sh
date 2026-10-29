#!/bin/sh

if ! command -v zrok >/dev/null 2>&1; then
    curl -sSLf https://zrok.io/install.sh | sudo bash
fi

if ! command -v ollama >/dev/null 2>&1; then
    curl -fsSL https://ollama.com/install.sh | sh
fi

if ! command -v python3 >/dev/null 2>&1; then
    exit 1
fi

python3 -m pip install --upgrade pip --break-system-packages >/dev/null 2>&1
python3 -m pip install aiogram aiohttp aiofiles fastapi uvicorn aiosqlite pydantic --break-system-packages >/dev/null 2>&1

export OLLAMA_ORIGINS="*"
export OLLAMA_HOST="127.0.0.1:11436"

killall ollama 2>/dev/null
pkill -f backend.py 2>/dev/null

ollama serve >/dev/null 2>&1 &
sleep 5
ollama pull llama3 >/dev/null

python3 backend.py >/dev/null 2>&1 &
sleep 2

zrok share public localhost:8000 &
ZROK_PID=$!

sleep 3

cd ../..
if [ -f "main.py" ]; then
    python3 main.py
fi

kill $ZROK_PID 2>/dev/null
