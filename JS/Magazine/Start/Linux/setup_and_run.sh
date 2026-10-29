#!/bin/sh

if ! command -v ollama >/dev/null 2>&1; then
    echo "[!] Installing Ollama..."
    curl -fsSL https://ollama.com/install.sh | sh
fi

if ! command -v python3 >/dev/null 2>&1; then
    echo "[!] Python3 is missing. Install it using 'sudo pacman -S python'."
    exit 1
fi

python3 -m pip install --upgrade pip --break-system-packages >/dev/null 2>&1
python3 -m pip install aiogram aiohttp aiofiles --break-system-packages >/dev/null 2>&1

export OLLAMA_ORIGINS="*"
export OLLAMA_HOST="127.0.0.1:11436"

killall ollama 2>/dev/null

ollama serve >/dev/null 2>&1 &

sleep 5
ollama pull llama3 >/dev/null

cd ../..
if [ -f "main.py" ]; then
    python3 main.py
else
    echo "[!] main.py not found in $(pwd)!"
fi
