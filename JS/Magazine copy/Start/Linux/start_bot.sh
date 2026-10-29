#!/bin/sh

echo "[1/3] Checking Python..."
if ! command -v python3 >/dev/null 2>&1; then
    echo "[!] Python3 is not installed. Install it via 'sudo pacman -S python'."
    read -r _
    exit 1
fi

echo "[2/3] Installing dependencies..."
python3 -m pip install --break-system-packages aiogram aiohttp aiofiles

echo "[3/3] Starting Telegram Bot..."
cd ../..
if [ -f "main.py" ]; then
    python3 main.py
else
    echo "[!] main.py not found in $(pwd)!"
fi

read -r _
