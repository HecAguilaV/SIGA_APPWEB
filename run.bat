@echo off
REM SIGA Prototipo - Script de ejecución para Windows
REM Uso: run.bat [comando]

setlocal enabledelayedexpansion

REM Colores (simulados con color de fondo)
set "GREEN=[92m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "RED=[91m"
set "NC=[0m"

if "%1"=="" goto help
if "%1"=="help" goto help
if "%1"=="--help" goto help
if "%1"=="-h" goto help

if "%1"=="dev" goto dev
if "%1"=="test" goto test
if "%1"=="test:watch" goto test_watch
if "%1"=="build" goto build
if "%1"=="preview" goto preview
if "%1"=="check" goto check
if "%1"=="install" goto install

echo ❌ Comando desconocido: %1
echo.
goto help

:help
echo.
echo ═══════════════════════════════════════
echo    SIGA PROTOTIPO - Script de Ejecución
echo ═══════════════════════════════════════
echo.
echo Uso:
echo   run.bat [comando]
echo.
echo Comandos disponibles:
echo   dev          - Inicia servidor de desarrollo (localhost:5173)
echo   test         - Ejecuta tests con Karma + Jasmine
echo   test:watch   - Ejecuta tests en modo watch
echo   build        - Compila para producción
echo   preview      - Vista previa de build
echo   check        - Verifica tipos TypeScript
echo   install      - Instala dependencias
echo   help         - Muestra esta ayuda
echo.
echo Ejemplos:
echo   run.bat dev
echo   run.bat test
echo   run.bat build
echo.
goto end

:dev
echo 🚀 Iniciando servidor de desarrollo...
node ./node_modules/vite/bin/vite.js
goto end

:test
echo 🧪 Ejecutando tests (una sola vez)...
node ./node_modules/karma/bin/karma start karma.conf.cjs --single-run=true --browsers=ChromeHeadless
goto end

:test_watch
echo 🧪 Ejecutando tests en modo watch...
node ./node_modules/karma/bin/karma start karma.conf.cjs --single-run=false
goto end

:build
echo 🔨 Compilando para producción...
node ./node_modules/vite/bin/vite.js build
goto end

:preview
echo 👁️ Vista previa del build...
node ./node_modules/vite/bin/vite.js preview
goto end

:check
echo ✓ Verificando tipos TypeScript...
node ./node_modules/.bin/svelte-kit sync
node ./node_modules/.bin/svelte-check --tsconfig ./tsconfig.json
goto end

:install
echo 📦 Instalando dependencias...
npm install
echo ✓ Dependencias instaladas
goto end

:end
pause
