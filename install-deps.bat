@echo off
REM ============================================
REM   SIGA - Install Dependencies + Run Tests
REM   Instala Karma, Jasmine y ejecuta tests
REM ============================================

setlocal enabledelayedexpansion
set NODE_PATH=C:\Users\hdagu\.nodejs\node-v20.11.0-win-x64
set PATH=%NODE_PATH%;%PATH%

cd /d "c:\Users\hdagu\Documents\SIGA_PROTOTIPO"

echo.
echo ============================================
echo   SIGA - Setting up Testing Environment
echo ============================================
echo.

echo [1/3] Checking Node.js...
%NODE_PATH%\node.exe --version

echo.
echo [2/3] Installing dependencies...
echo (This may take 1-2 minutes on first run)
echo.

%NODE_PATH%\npm.cmd install --legacy-peer-deps

if errorlevel 1 (
    echo.
    echo ERROR: npm install failed!
    echo Try running as Administrator or use Git Bash instead
    echo.
    pause
    exit /b 1
)

echo.
echo [3/3] Running tests...
echo.

%NODE_PATH%\npm.cmd test

pause
