@echo off
cd /d c:\Users\hdagu\Documents\SIGA_PROTOTIPO
echo ========================================
echo EJECUTANDO 5 TESTS CON JASMINE + KARMA
echo ========================================
echo.

call npm run test:ci

echo.
echo ========================================
echo TESTS COMPLETADOS
echo ========================================
pause
