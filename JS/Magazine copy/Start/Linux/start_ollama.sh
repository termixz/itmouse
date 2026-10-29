#!/bin/sh

export OLLAMA_ORIGINS="*"
export OLLAMA_HOST="127.0.0.1:11436"

if ! command -v ollama >/dev/null 2>&1; then
    echo "[!] Ollama not found."
fi

echo "[1/3] Killing existing Ollama processes..."
killall ollama 2>/dev/null

echo "[2/3] Setting environment variables for this session..."
echo "OLLAMA_ORIGINS=$OLLAMA_ORIGINS"
echo "OLLAMA_HOST=$OLLAMA_HOST"

echo "[3/3] Starting AI Server on $OLLAMA_HOST..."
echo "SUCCESS: CORS is configured to \"*\". Keep this window open!"
echo ""

ollama serve
read -r _
