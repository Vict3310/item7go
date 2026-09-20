import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');
const distDir = resolve(projectRoot, 'dist');
const serverFile = resolve(distDir, 'index.js');

mkdirSync(distDir, { recursive: true });

const html = readFileSync(resolve(distDir, 'index.html'), 'utf8');

const serverCode = `import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';

const root = resolve(process.cwd(), 'dist');
const port = Number(process.env.PORT || 5173);
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

const fallbackHtml = ${JSON.stringify(html)};

const server = http.createServer(async (req, res) => {
  const requestPath = new URL(req.url || '/', 'http://localhost').pathname;
  const safePath = decodeURIComponent(requestPath === '/' ? '/index.html' : requestPath);
  const filePath = resolve(root, '.' + safePath);

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  try {
    const content = await readFile(filePath);
    const type = mimeTypes[extname(filePath).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type });
    res.end(content);
  } catch {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(fallbackHtml);
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log('Static app running on http://0.0.0.0:' + port);
});
`;

writeFileSync(serverFile, serverCode, 'utf8');
console.log(`Created runtime server at ${serverFile}`);
