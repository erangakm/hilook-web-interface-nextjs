# HiLook Web Interface (Next.js)

A self-hosted live view dashboard for HiLook/Hikvision IP cameras. Pulls snapshots and RTSP streams directly from your NVR/cameras — no cloud, no vendor app.

This is a Node/Next.js rewrite of [Mo-Fouadd/HiLook-Web-View-Interface](https://github.com/Mo-Fouadd/HiLook-Web-View-Interface), which implemented the original concept in Python/Flask. All credit for the original idea and camera integration approach goes to [@Mo-Fouadd](https://github.com/Mo-Fouadd).

## What it does

- **Grid view** (`/`) — every camera group from your config, laid out in rows, each tile at 16:9.
- **Focus view** (`/focus`) — one main camera large, the rest in a 2x2 grid.
- **Fullscreen** — double-click any camera for a live, full-screen 16:9 stream (letterboxed, no stretching). Arrow keys cycle between cameras; Escape exits.
- A background **worker** service polls camera snapshots (for the grid thumbnails) and proxies RTSP-to-MJPEG streams (for fullscreen) via ffmpeg.

## Architecture

```
┌─────────┐   snapshot/stream requests   ┌──────────┐   HTTP (ISAPI) + RTSP   ┌──────────┐
│ Browser │ ───────────────────────────► │   web    │ ──────────────────────► │  worker  │ ──► HiLook camera/NVR
│         │ ◄─────────────────────────── │ (Next.js)│ ◄────────────────────── │ (Express)│
└─────────┘                              └──────────┘                         └──────────┘
```

- **`web/`** — Next.js app. Renders the grid/focus layouts and proxies `/api/snapshot/:id` and `/api/stream/:id` to the worker.
- **`worker/`** — Express service. Polls camera snapshots via digest-authenticated HTTP (Hikvision ISAPI), and spawns ffmpeg per-connection to convert RTSP to MJPEG for live fullscreen viewing.

## Getting started

1. Copy the env template and fill in your camera's details:
   ```
   cp .env.example .env
   ```
2. Edit `.env`:
   - `CAM_IP`, `CAM_USER`, `CAM_PASS` — your NVR/camera credentials
   - `CAM_STREAM` — RTSP stream number (`1` = main stream, `2` = substream)
   - `TARGET_CAMERAS` — comma-separated channel numbers to poll
   - `GROUP_1`, `GROUP_2`, `GROUP_3`, ... — how cameras are grouped into rows on the grid view; the first group also becomes the "main" camera on `/focus`
   - `POLL_INTERVAL` — seconds between snapshot refreshes per group
   - `COVER_UP_CAMERAS` — set to `1` to show a skeleton placeholder instead of real camera feeds (demo mode)
3. Build and run:
   ```
   docker compose up --build
   ```
4. Open the dashboard:
   - Grid view: [http://localhost:3000](http://localhost:3000)
   - Focus view: [http://localhost:3000/focus](http://localhost:3000/focus)

## Requirements

- Docker + Docker Compose
- A HiLook/Hikvision camera or NVR reachable from the host, with ISAPI and RTSP enabled

## Credits

- Original concept and Python/Flask implementation: [Mo-Fouadd/HiLook-Web-View-Interface](https://github.com/Mo-Fouadd/HiLook-Web-View-Interface)
- This repo: Node.js/Next.js/TypeScript rewrite with a grid + focus layout system, live fullscreen streaming, and Docker-based deployment.
