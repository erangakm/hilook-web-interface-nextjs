# Graph Report - hilook-web-interface-nextjs  (2026-09-17)

## Corpus Check
- Corpus is ~1,935 words - fits in a single context window. You may not need a graph.

## Summary
- 151 nodes · 175 edges · 12 communities (8 shown, 4 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.89)
- Token cost: 78,401 input · 0 output

## Community Hubs (Navigation)
- Worker: Camera Auth & Snapshot
- Web Package Dependencies
- TS Config (web)
- Web UI: Grid & Camera Feed
- Worker Package Dependencies
- Deployment & Streaming Pipeline
- Worker API Routes
- TS Config (worker)
- Next.js Config
- Project Origin
- Global Type Declarations
- Next.js Env Types

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `compilerOptions` - 10 edges
3. `Worker Service (Express)` - 7 edges
4. `Web App (Next.js)` - 7 edges
5. `useCameraFeed()` - 6 edges
6. `digestGet()` - 5 edges
7. `config` - 4 edges
8. `scripts` - 4 edges
9. `react` - 4 edges
10. `config` - 4 edges

## Surprising Connections (you probably didn't know these)
- `worker service (docker-compose)` --conceptually_related_to--> `Worker Service (Express)`  [INFERRED]
  docker-compose.yml → README.md
- `web service (docker-compose)` --conceptually_related_to--> `Web App (Next.js)`  [INFERRED]
  docker-compose.yml → README.md
- `web service (docker-compose)` --references--> `.env Configuration (CAM_IP, CAM_USER, CAM_PASS, CAM_STREAM, TARGET_CAMERAS, GROUP_N, POLL_INTERVAL)`  [EXTRACTED]
  docker-compose.yml → README.md
- `worker service (docker-compose)` --references--> `.env Configuration (CAM_IP, CAM_USER, CAM_PASS, CAM_STREAM, TARGET_CAMERAS, GROUP_N, POLL_INTERVAL)`  [EXTRACTED]
  docker-compose.yml → README.md
- `FocusGrid()` --calls--> `useCameraFeed()`  [EXTRACTED]
  web/components/FocusGrid.tsx → web/hooks/useCameraFeed.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Camera Streaming Pipeline: web -> worker -> ISAPI/RTSP -> ffmpeg** — readme_web_app, readme_worker_service, readme_isapi, readme_rtsp, readme_ffmpeg [EXTRACTED 1.00]
- **Docker Compose deployment of web + worker services** — docker_compose_web, docker_compose_worker, readme_docker_compose [EXTRACTED 1.00]

## Communities (12 total, 4 thin omitted)

### Community 0 - "Worker: Camera Auth & Snapshot"
Cohesion: 0.11
Nodes (23): ref_child_process, ref_crypto, express, ref_http, ref_stream, ref_url, allGroups(), config (+15 more)

### Community 1 - "Web Package Dependencies"
Cohesion: 0.09
Nodes (22): next, react-dom, @types/react, @types/react-dom, dependencies, next, react, react-dom (+14 more)

### Community 2 - "TS Config (web)"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 3 - "Web UI: Grid & Camera Feed"
Cohesion: 0.16
Nodes (9): react, web_app_globals, metadata, dynamic, CameraTile(), FocusGrid(), useCameraFeed(), navigate() (+1 more)

### Community 4 - "Worker Package Dependencies"
Cohesion: 0.12
Nodes (15): @types/express, dependencies, express, devDependencies, @types/express, @types/node, typescript, @types/node (+7 more)

### Community 5 - "Deployment & Streaming Pipeline"
Cohesion: 0.23
Nodes (13): web service (docker-compose), worker service (docker-compose), WORKER_URL env var (http://worker:4001), Docker Compose (build/run), .env Configuration (CAM_IP, CAM_USER, CAM_PASS, CAM_STREAM, TARGET_CAMERAS, GROUP_N, POLL_INTERVAL), ffmpeg (RTSP-to-MJPEG conversion), Focus View (/focus), Fullscreen Live Stream (+5 more)

### Community 6 - "Worker API Routes"
Cohesion: 0.19
Nodes (8): dynamic, runtime, dynamic, runtime, allGroups(), config, groups, parseIds()

### Community 7 - "TS Config (worker)"
Cohesion: 0.17
Nodes (11): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, module, moduleResolution, outDir, rootDir, skipLibCheck (+3 more)

## Knowledge Gaps
- **80 isolated node(s):** `runtime`, `dynamic`, `runtime`, `dynamic`, `metadata` (+75 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 94 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Web UI: Grid & Camera Feed` to `Web Package Dependencies`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Why does `express` connect `Worker: Camera Auth & Snapshot` to `Worker Package Dependencies`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `useCameraFeed()` (e.g. with `onKey()` and `toggle()`) actually correct?**
  _`useCameraFeed()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `runtime`, `dynamic`, `runtime` to the rest of the system?**
  _80 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Worker: Camera Auth & Snapshot` be split into smaller, more focused modules?**
  _Cohesion score 0.11083743842364532 - nodes in this community are weakly interconnected._
- **Should `Web Package Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `TS Config (web)` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._