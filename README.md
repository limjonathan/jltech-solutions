# JL Tech Solutions

Enterprise IT Infrastructure & SecOps corporate website with crawlable service and industry landing pages.

## Tech Stack

- Static HTML/CSS/JS site: a visual home page plus crawlable service and industry landing pages
- Node.js HTTP server (zero external dependencies)
- Google Fonts: Geist, JetBrains Mono

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
├── index.html       # Visual home page (hero, services, NOC dashboard, about, ticket portal)
├── managed-it-services.html
├── cybersecurity.html
├── healthcare-it.html
├── philadelphia-on-site-it-support.html
├── style.css        # Complete design system with responsive breakpoints
├── app.js           # Client-side interactivity (modals, telemetry, form simulation)
├── server.js        # Node.js static file server with rate limiting and security headers
├── package.json     # Project metadata and scripts
├── assets/          # Logo and image assets
├── sitemap.xml      # Homepage and crawlable landing pages
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
