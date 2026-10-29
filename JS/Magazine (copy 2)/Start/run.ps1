$ollamaExists = $false
if (Get-Command "ollama" -ErrorAction SilentlyContinue) { $ollamaExists = $true }
if (Test-Path "$env:LOCALAPPDATA\Microsoft\WindowsApps\ollama.exe") { $ollamaExists = $true }
if (Test-Path "C:\Users\$env:USERNAME\AppData\Local\Programs\Ollama\ollama.exe") { $ollamaExists = $true }

if ($ollamaExists) {
    Write-Host "--- Ollama found ---" -ForegroundColor Green
} else {
    Write-Host "--- Installing Ollama ---" -ForegroundColor Cyan
    irm https://ollama.com/install.ps1 | iex
}

if (Get-Command "python" -ErrorAction SilentlyContinue) {
    Write-Host "--- Python found ---" -ForegroundColor Green
} else {
    Write-Host "--- Installing Python ---" -ForegroundColor Cyan
    winget install -e --id Python.Python.3.12 --scope machine --override "/passive InstallAllUsers=1 PrependPath=1"
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
}

Write-Host "--- Checking libraries ---" -ForegroundColor Cyan
python -m pip install --upgrade pip
python -m pip install aiogram aiohttp aiofiles

Write-Host "--- Starting AI Server ---" -ForegroundColor Cyan
$env:OLLAMA_ORIGINS="*"
$env:OLLAMA_HOST="127.0.0.1:11436"

taskkill /f /im ollama.exe 2>$null

Start-Process powershell -ArgumentList "ollama serve"

Write-Host "Waiting for server..."
Start-Sleep -Seconds 5
ollama pull llama3

Write-Host "--- Starting Bot ---" -ForegroundColor Green
cd ..
if (Test-Path "main.py") {
    python main.py
} else {
    Write-Host "[!] main.py not found!" -ForegroundColor Red
}

Pause
