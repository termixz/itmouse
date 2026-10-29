#!/bin/sh

cd "$(dirname "$0")/../.."

python3 -m pip install aiogram aiohttp aiofiles fastapi uvicorn aiosqlite pydantic --break-system-packages >/dev/null 2>&1

export OLLAMA_ORIGINS="*"
export OLLAMA_HOST="127.0.0.1:11436"

killall ollama 2>/dev/null
pkill -f backend.py 2>/dev/null
pkill -f zrok2 2>/dev/null

rm -f /tmp/zrok.log

ZROK_CMD="zrok2 share public http://localhost:8000 | tee /tmp/zrok.log"

if command -v kitty >/dev/null 2>&1; then
    kitty sh -c "$ZROK_CMD" &
elif command -v alacritty >/dev/null 2>&1; then
    alacritty -e sh -c "$ZROK_CMD" &
elif command -v foot >/dev/null 2>&1; then
    foot sh -c "$ZROK_CMD" &
elif command -v gnome-terminal >/dev/null 2>&1; then
    gnome-terminal -- sh -c "$ZROK_CMD" &
elif command -v konsole >/dev/null 2>&1; then
    konsole -e sh -c "$ZROK_CMD" &
else
    xterm -e sh -c "$ZROK_CMD" &
fi

ZROK_URL=""
for i in $(seq 1 20); do
    if [ -f /tmp/zrok.log ]; then
        HOST_NAME=$(grep -oE '[a-zA-Z0-9.-]+\.shares\.zrok\.io' /tmp/zrok.log | head -n 1)
        if [ -n "$HOST_NAME" ]; then
            ZROK_URL="https://$HOST_NAME"
            break
        fi
    fi
    sleep 1
done

for js in *.js; do
    if [ -f "$js" ]; then
        sed -i -E 's|https?://[a-zA-Z0-9.-]+\.shares\.zrok\.io||g' "$js"
        sed -i -E 's|http://localhost:8000||g' "$js"
        sed -i -E 's|http://127.0.0.1:8000||g' "$js"
        sed -i -E 's|const API_URL = ".*";|const API_URL = "";|g' "$js"
    fi
done

python3 backend.py >/dev/null 2>&1 &
sleep 2

ollama serve >/dev/null 2>&1 &
sleep 3
ollama pull llama3 >/dev/null 2>&1 &

if [ -f "main.py" ]; then
    python3 main.py
fi
