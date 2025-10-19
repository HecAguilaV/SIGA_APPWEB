@echo off
REM ============================================
REM   SIGA - Run Tests (Jasmine/Karma)
REM   Sin necesidad de PowerShell
REM ============================================

setlocal enabledelayedexpansion
set PATH=C:\Users\hdagu\.nodejs\node-v20.11.0-win-x64;%PATH%
cd /d "c:\Users\hdagu\Documents\SIGA_PROTOTIPO"

echo.
echo ============================================
echo   SIGA - Testing Suite
echo ============================================
echo.

REM Instalar dependencias si no existen
if not exist node_modules (
    echo [1/2] Instalando dependencias...
    call npm install
    echo.
)

REM Ejecutar tests
echo [2/2] Ejecutando tests...
echo.

call npm test

pause
