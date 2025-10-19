@echo off
setlocal enabledelayedexpansion
set NODE_PATH=C:\Users\hdagu\.nodejs\node-v20.11.0-win-x64
set PATH=%NODE_PATH%;%PATH%
cd /d "c:\Users\hdagu\Documents\SIGA_PROTOTIPO"

echo.
echo ============================================
echo   SIGA - Dev Server (http://localhost:5173)
echo ============================================
echo.
echo Iniciando servidor...
echo Abre tu navegador en: http://localhost:5173
echo.
echo Ctrl+C para detener
echo.

call %NODE_PATH%\npm.cmd run dev
