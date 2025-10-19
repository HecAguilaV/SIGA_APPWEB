@echo off
setlocal enabledelayedexpansion
set NODE_PATH=C:\Users\hdagu\.nodejs\node-v20.11.0-win-x64
set PATH=%NODE_PATH%;%PATH%
cd /d "c:\Users\hdagu\Documents\SIGA_PROTOTIPO"

echo.
echo ============================================
echo   SIGA - Instalar y Ejecutar Tests
echo ============================================
echo.

echo [1/3] Instalando dependencias base...
call %NODE_PATH%\npm.cmd install --legacy-peer-deps

echo.
echo [2/3] Instalando Babel y preprocessor...
call %NODE_PATH%\npm.cmd install --save-dev @babel/core @babel/preset-env karma-babel-preprocessor

echo.
echo [3/3] Ejecutando tests (Jasmine + Karma)...
echo.

call %NODE_PATH%\npm.cmd test

echo.
echo ============================================
echo   Tests completados. Presiona cualquier tecla...
echo ============================================
pause
