const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8005;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.json': 'application/json',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

const TEXT_EXTS = new Set(['.html', '.css', '.js', '.json', '.svg', '.ico']);

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 1000;
const RATE_LIMIT_MAX = 60;
const RATE_LIMIT_BLOCK = 60000;

function setSecurityHeaders(res) {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
}

function sendError(res, status, message, extraHeaders) {
    setSecurityHeaders(res);
    const headers = { 'Content-Type': 'text/plain' };
    if (extraHeaders) Object.assign(headers, extraHeaders);
    res.writeHead(status, headers);
    res.end(message);
}

function applyRateLimit(req, res) {
    const ip = req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const entry = rateLimitMap.get(ip);
    if (entry && entry.blockUntil > now) {
        sendError(res, 429, 'Too Many Requests', { 'Retry-After': '60' });
        return false;
    }
    if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW) {
        rateLimitMap.set(ip, { count: 1, windowStart: now });
        return true;
    }
    entry.count++;
    if (entry.count > RATE_LIMIT_MAX) {
        entry.blockUntil = now + RATE_LIMIT_BLOCK;
        sendError(res, 429, 'Too Many Requests', { 'Retry-After': '60' });
        return false;
    }
    return true;
}

setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of rateLimitMap) {
        if (entry.blockUntil && entry.blockUntil <= now) rateLimitMap.delete(ip);
        else if (!entry.blockUntil && now - entry.windowStart > RATE_LIMIT_WINDOW * 2) rateLimitMap.delete(ip);
    }
}, 60000);

const server = http.createServer((req, res) => {
    console.log(`[JL_TECH_SITE] ${req.method} ${req.url}`);
    if (!applyRateLimit(req, res)) return;
    const urlPath = decodeURIComponent(req.url);
    const normalized = path.normalize(urlPath).replace(/^(\.\.[\/\\])+/, '');
    let filePath = normalized === '/' || normalized === '' ? path.join(__dirname, 'index.html') : path.join(__dirname, normalized);
    let realPath;
    try { realPath = fs.realpathSync(filePath); }
    catch { sendError(res, 404, 'Not Found'); return; }
    if (!realPath.startsWith(__dirname)) { sendError(res, 403, 'Forbidden'); return; }
    const extname = path.extname(realPath).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';
    const isText = TEXT_EXTS.has(extname);
    fs.readFile(realPath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') sendError(res, 404, 'Not Found');
            else { console.error(`[ERROR] Failed to read ${realPath}: ${err.code}`); sendError(res, 500, 'Internal Server Error'); }
        } else {
            setSecurityHeaders(res);
            res.setHeader('Cache-Control', 'public, max-age=2592000');
            res.writeHead(200, { 'Content-Type': contentType });
            if (isText) res.end(content, 'utf-8');
            else res.end(content);
        }
    });
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') { console.error(`Port ${PORT} is already in use.`); process.exit(1); }
    throw err;
});
process.on('SIGTERM', () => { console.log('[JL_TECH_SITE] Shutting down...'); server.close(() => process.exit(0)); });
process.on('SIGINT', () => { console.log('[JL_TECH_SITE] Shutting down...'); server.close(() => process.exit(0)); });
server.listen(PORT, () => {
    console.log('==========================================');
    console.log('JL Tech Solutions Corporate Server');
    console.log(`Running at: http://localhost:${PORT}`);
    console.log('==========================================');
});
