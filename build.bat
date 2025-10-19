@echo off
REM ============================================
REM   SIGA - Build Production
REM   Sin necesidad de PowerShell
REM ============================================

setlocal enabledelayedexpansion
set PATH=C:\Users\hdagu\.nodejs\node-v20.11.0-win-x64;%PATH%
cd /d "c:\Users\hdagu\Documents\SIGA_PROTOTIPO"

echo.
echo ============================================
echo   SIGA - Build Production
echo ============================================
echo.

REM Instalar dependencias si no existen
if not exist node_modules (
    echo [1/2] Instalando dependencias...
    call npm install
    echo.
)

REM Build
echo [2/2] Compilando para producción...
echo.

call npm run build

echo.
echo ============================================
echo   Build completado! Versión lista para Vercel
echo ============================================
echo.

pause
