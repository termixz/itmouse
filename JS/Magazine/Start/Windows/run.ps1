$ollamaExists = $false
if (Get-Command "ollama" -ErrorAction SilentlyContinue) { $ollamaExists = $true }
if (Test-Path "$env:LOCALAPPDATA\Microsoft\WindowsApps\ollama.exe") { $ollamaExists = $true }
if (Test-Path "C:\Users\$env:USERNAME\AppData\Local\Programs\Ollama\ollama.exe") { $ollamaExists = $true }

if (-not $ollamaExists) {
    irm https://ollama.com/install.ps1 | iex | Out-Null
}

if (-not (Get-Command "python" -ErrorAction SilentlyContinue)) {
    winget install -e --id Python.Python.3.12 --scope machine --override "/passive InstallAllUsers=1 PrependPath=1" --silent | Out-Null
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
}

python -m pip install --upgrade pip --quiet > $null
python -m pip install aiogram aiohttp aiofiles --quiet > $null

$env:OLLAMA_ORIGINS="*"
$env:OLLAMA_HOST="127.0.0.1:11436"

taskkill /f /im ollama.exe 2>$null | Out-Null

Start-Process powershell -ArgumentList "ollama serve" -WindowStyle Hidden

Start-Sleep -Seconds 5
ollama pull llama3 > $null

cd ..
if (Test-Path "main.py") {
    python main.py
}
