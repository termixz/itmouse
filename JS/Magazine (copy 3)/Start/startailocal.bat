@echo off
set OLLAMA_ORIGINS=*
set OLLAMA_HOST=127.0.0.1:11436

ollama --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [!] Ollama not found.
    
)

echo [1/3] Killing existing Ollama processes...
taskkill /f /im ollama.exe >nul 2>&1

echo [2/3] Setting environment variables for this session...
set OLLAMA_ORIGINS=*
set OLLAMA_HOST=127.0.0.1:11436

echo [3/3] Starting AI Server on %OLLAMA_HOST%...
echo SUCCESS: CORS is configured to "*". Keep this window open!
echo.
ollama serve
pause
