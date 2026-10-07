const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const distDir = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.map': 'application/json',
};

function serveFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
      return;
    }
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': filePath.includes('_expo') ? 'public, max-age=31536000, immutable' : 'public, max-age=3600',
    });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Dynamic API & AI Route Extension Hook
  // Add custom endpoints here (e.g. POST /api/chat, /api/ai)
  if (pathname.startsWith('/api/')) {
    if (pathname === '/api/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok', platform: 'universal', time: new Date().toISOString() }));
      return;
    }
    // Unhandled API routes return JSON 404
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: `API route ${pathname} not found` }));
    return;
  }

  // Normalize path and prevent directory traversal
  let safePath = path.normalize(path.join(distDir, pathname));
  if (!safePath.startsWith(distDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  // Check if direct file exists
  if (fs.existsSync(safePath) && fs.statSync(safePath).isFile()) {
    const ext = path.extname(safePath).toLowerCase();
    serveFile(res, safePath, MIME_TYPES[ext] || 'application/octet-stream');
    return;
  }

  // Check HTML route matches (e.g. /explore -> /explore.html or /explore/index.html)
  const htmlPath = safePath.endsWith('.html') ? safePath : `${safePath}.html`;
  if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
    serveFile(res, htmlPath, MIME_TYPES['.html']);
    return;
  }

  const indexPath = path.join(safePath, 'index.html');
  if (fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) {
    serveFile(res, indexPath, MIME_TYPES['.html']);
    return;
  }

  // Fallback to +not-found.html or index.html
  const notFoundPath = path.join(distDir, '+not-found.html');
  if (fs.existsSync(notFoundPath)) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(notFoundPath).pipe(res);
    return;
  }

  const rootIndex = path.join(distDir, 'index.html');
  if (fs.existsSync(rootIndex)) {
    serveFile(res, rootIndex, MIME_TYPES['.html']);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Static bundle not found. Run "npm run export:web" first.');
});

server.listen(port, () => {
  console.log(`> Falda SuperApp production server running at http://localhost:${port}`);
});
