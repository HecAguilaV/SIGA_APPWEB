@echo off
REM ============================================
REM   SIGA - Watch Tests (Auto-run)
REM   Sin necesidad de PowerShell
REM ============================================

setlocal enabledelayedexpansion
set PATH=C:\Users\hdagu\.nodejs\node-v20.11.0-win-x64;%PATH%
cd /d "c:\Users\hdagu\Documents\SIGA_PROTOTIPO"

echo.
echo ============================================
echo   SIGA - Testing Suite (Watch Mode)
echo ============================================
echo.
echo Los tests se ejecutaran automaticamente
echo cuando hagas cambios en los archivos
echo.
echo Presiona Ctrl+C para detener
echo.

REM Instalar dependencias si no existen
if not exist node_modules (
    echo [1/2] Instalando dependencias...
    call npm install
    echo.
)

REM Watch tests
echo [2/2] Iniciando watch mode...
echo.

call npm run test:watch

pause
