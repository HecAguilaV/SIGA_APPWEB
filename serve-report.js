#!/usr/bin/env node

/**
 * Servidor simple para visualizar TEST_REPORT.html
 * Uso: node serve-report.js
 * Abre: http://localhost:8000/TEST_REPORT.html
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8000;
const REPORT_PATH = path.join(__dirname, 'TEST_REPORT.html');

const server = http.createServer((req, res) => {
  // Ruta para el reporte HTML
  if (req.url === '/TEST_REPORT.html' || req.url === '/') {
    fs.readFile(REPORT_PATH, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Archivo TEST_REPORT.html no encontrado\n');
        return;
      }
      
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Recurso no encontrado\n');
  }
});

server.listen(PORT, '127.0.0.1', () => {
  const url = `http://localhost:${PORT}/TEST_REPORT.html`;
  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║  🧪 SIGA - Test Report Server                         ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log('\n');
  console.log(`✅ Servidor corriendo en: ${url}`);
  console.log('\n');
  console.log('📊 Reporte disponible en:');
  console.log(`   ${url}`);
  console.log('\n');
  console.log('Presiona Ctrl+C para detener el servidor\n');
  
  // Intentar abrir el navegador automáticamente
  const openCommand = process.platform === 'win32' 
    ? `start ${url}`
    : process.platform === 'darwin' 
    ? `open ${url}`
    : `xdg-open ${url}`;
  
  exec(openCommand, (error) => {
    if (error) {
      console.log(`ℹ️  Abre manualmente: ${url}\n`);
    }
  });
});
