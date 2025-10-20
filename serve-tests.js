#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const PORT = 3001;

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (req.url === '/') {
    try {
      const xmlPath = path.join(__dirname, 'test-results', 'test-results.xml');
      
      if (!fs.existsSync(xmlPath)) {
        res.writeHead(200);
        res.end(fs.readFileSync(path.join(__dirname, 'test-report.html')));
        return;
      }

      const xmlData = fs.readFileSync(xmlPath, 'utf-8');
      const parser = new xml2js.Parser();
      const result = await parser.parseStringPromise(xmlData);
      
      res.writeHead(200);
      const html = generateHTML(result);
      res.end(html);
    } catch (err) {
      res.writeHead(200);
      res.end(fs.readFileSync(path.join(__dirname, 'test-report.html')));
    }
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

function generateHTML(result) {
  const testsuites = result.testsuites.testsuite || [];
  let totalTests = 0;
  let totalPassed = 0;
  let totalFailed = 0;
  let html = '';

  testsuites.forEach(suite => {
    const suiteName = suite.$.name;
    const tests = suite.testcase || [];
    
    html += `<div class="test-group">
      <h2 class="subtitle">${suiteName}</h2>`;
    
    tests.forEach(test => {
      totalTests++;
      const testName = test.$.name;
      const hasFailure = test.failure;
      
      if (!hasFailure) totalPassed++;
      else totalFailed++;
      
      const icon = hasFailure ? '✗' : '✓';
      const cls = hasFailure ? 'test-fail' : 'test-pass';
      
      html += `<div class="test-item">
        <span class="${cls}">${icon} ${testName}</span>
      </div>`;
    });
    
    html += '</div>';
  });

  return fs.readFileSync(path.join(__dirname, 'test-report.html'), 'utf-8')
    .replace('id="results">', `id="results">${html}`)
    .replace('id="total">0<', `id="total">${totalTests}<`)
    .replace('id="passed">0<', `id="passed">${totalPassed}<`)
    .replace('id="failed">0<', `id="failed">${totalFailed}<`);
}

server.listen(PORT, () => {
  console.log(`📊 Test Report Server: http://localhost:${PORT}`);
});
