#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (req.url === '/') {
    try {
      res.writeHead(200);
      res.end(fs.readFileSync(path.join(__dirname, 'test-report.html')));
    } catch (err) {
      res.writeHead(500);
      res.end('Error loading report');
    }
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`📊 Test Report Server: http://localhost:${PORT}`);
  console.log(`🌐 Abre el navegador en http://localhost:${PORT}`);
});
