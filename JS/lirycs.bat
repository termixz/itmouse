#!/bin/bash

MODEL_FILE="ggml-tiny.bin"

if [ ! -f "$MODEL_FILE" ]; then
    curl -L "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-tiny.bin" -o "$MODEL_FILE"
fi

while true; do
    arecord -d 2 -f S16_LE -r 16000 -t wav temp.wav 2>/dev/null
    
    words=$(whisper-cli -m "$MODEL_FILE" -f temp.wav -nt 2>/dev/null | tr -d '[]()')
    
    for word in $words; do
        clean_word=$(echo "$word" | tr -d '[:punct:]' | tr '[:lower:]' '[:upper:]')
        if [ -n "$clean_word" ] && [ "${#clean_word}" -gt 1 ]; then
            clear
            # Используем шрифт bigmono9 для эффекта блоков
            echo "$clean_word" | toilet -f bigmono9 --termwidth
            sleep 0.2
        fi
    done
done
