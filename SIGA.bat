@echo off
REM ============================================
REM   SIGA - Scripts Simplificados
REM ============================================

setlocal enabledelayedexpansion
set NODE_PATH=C:\Users\hdagu\.nodejs\node-v20.11.0-win-x64
set PATH=%NODE_PATH%;%PATH%
cd /d "c:\Users\hdagu\Documents\SIGA_PROTOTIPO"

echo.
echo ============================================
echo   SIGA - Elige una opcion:
echo ============================================
echo.
echo   1. Ejecutar Tests (Jasmine + Karma)
echo   2. Iniciar Servidor Local (http://localhost:5173)
echo   3. Build para Produccion
echo   4. Instalar Dependencias
echo.
echo ============================================
echo.

set /p choice="Opcion (1-4): "

if "%choice%"=="1" (
    echo.
    echo [TESTS] Ejecutando Jasmine + Karma...
    call %NODE_PATH%\npm.cmd install --legacy-peer-deps > nul 2>&1
    call %NODE_PATH%\npm.cmd run test:ci
    pause
) else if "%choice%"=="2" (
    echo.
    echo [DEV SERVER] Iniciando en http://localhost:5173...
    call %NODE_PATH%\npm.cmd run dev
) else if "%choice%"=="3" (
    echo.
    echo [BUILD] Compilando para produccion...
    call %NODE_PATH%\npm.cmd run build
    pause
) else if "%choice%"=="4" (
    echo.
    echo [INSTALL] Instalando dependencias...
    call %NODE_PATH%\npm.cmd install --legacy-peer-deps
    pause
) else (
    echo Opcion invalida
    pause
)
