# JL Tech Solutions

Enterprise IT Infrastructure & SecOps corporate website.

## Tech Stack

- Static HTML/CSS/JS single-page application
- Node.js HTTP server (zero external dependencies)
- Google Fonts: Inter, Orbitron, JetBrains Mono

## Getting Started

```bash
npm start
# or
node server.js
```

Server runs at `http://localhost:8005` by default. Set `PORT` env var to override.

## Project Structure

```
.
├── index.html       # Single-page site (hero, services, NOC dashboard, about, ticket portal)
├── style.css        # Complete design system with responsive breakpoints
├── app.js           # Client-side interactivity (canvas, modals, telemetry, form simulation)
├── server.js        # Node.js static file server with rate limiting and security headers
├── package.json     # Project metadata and scripts
├── assets/          # Logo and image assets
└── robots.txt       # Search engine crawl rules
```

## Sections

- **Hero** — Brand statement with NOC status badge
- **Solutions** — Service cards with modal detail drawers (Cloud, AD, NOC, Hardening)
- **NOC Dashboard** — Simulated telemetry metrics, log journal, network interfaces
- **About** — Company background and credentials
- **Service Portal** — Interactive ticket submission with terminal-style processing animation

## Deployment

Static hosting (Netlify, Vercel, etc.) or the built-in Node.js server behind a reverse proxy (nginx/Caddy) with HTTPS termination.
