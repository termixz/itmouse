@echo off
echo [1/3] Checking Python...
python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [!] Python is not installed. Install Python 3.10+ and add it to PATH.
    pause
    exit
)

echo [2/3] Installing dependencies...
pip install aiogram aiohttp aiofiles

echo [3/3] Starting Telegram Bot...
if exist main.py (
    python main.py
) else (
    echo [!] main.py not found in current directory!
)
pause
