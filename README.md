# Multi-instance Neon Snake Arena

A real-time, low-latency multiplayer 3D snake battle arena. Built under a modern 3D stack (React, Three.js, React Three Fiber, Socket.io, and Tailwind CSS), players navigate a dark glowing grid to consume vibrant energy orbs, dodge other players, grow their snake length, and climb the live leaderboards.

---

<img width="2772" height="1452" alt="image" src="https://github.com/user-attachments/assets/56d0f08b-92b5-444e-99af-714a1e11d731" />

<img width="2831" height="1370" alt="image" src="https://github.com/user-attachments/assets/854da7d5-3bb0-4627-8644-a910c34738d9" />


## Features

- **Smooth Client-Side Prediction**: Implements high-frequency local prediction, input processing, and visual interpolation to deliver instantaneous feel and handle multiplayer jitter elegantly.
- **Intense 3D Visuals & Glow Effects**: Rich volumetric rendering using Three.js instanced mesh rendering, real-time ground soft shadows, glowing neon grid layers, and bloom postprocessing.
- **Express + Socket.io Server Architecture**: Low-overhead backend serving both static client assets and real-time state synchronization via binary-friendly events at 20Hz.
- **Interactive Leaderboard**: Synchronized live stats table displaying players' active names, scores, and custom colors.
- **Performance Optimized**: Low-overhead multi-instance rendering using WebGL instanced meshes to draw thousands of snake segments and food orbs with a single GPU draw call.

---

## Controls

- **Move Left**: `A` or `Left Arrow`
-  **Move Right**: `D` or `Right Arrow`
- **Boost Speed**: `SPACE` or `W` or `Up Arrow` (Consumes length/score over time when active!)

---

## Directory Structure

```
├── server.ts                 # Express & Socket.io server with game-loop state engine
├── vite.config.ts            # Vite compiler configuration
├── package.json              # App dependencies and full-stack bundling scripts
├── tsconfig.json             # TypeScript project rules
├── index.html                # Client-side shell layout
└── src/
    ├── main.tsx              # React mounting entry point
    ├── App.tsx               # Primary interface orchestratng canvas viewport & DOM UI
    ├── index.css             # Tailwind CSS global setup
    ├── shared/
    │   └── types.ts          # Shared game loop physics config, schema & typescript types
    ├── store/
    │   └── gameStore.ts      # Zustand-powered Socket.io communications state manager
    └── components/
        ├── GameScene.tsx     # WebGL geometries, instanced rendering, controls & collision math
        └── UI.tsx            # Dynamic HUD overlay (Menus, Leaderboard, controls hints)
```

---

## How to Install and Run Locally

Ensure you have [Node.js (v20+)](https://nodejs.org/) installed.

### 1. Install Dependencies
```bash
npm install
```

### 2. Run in Development Mode
Starts the high-speed dev server with integrated hot-module asset-serving proxy.
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 3. Production Build and Execution
Builds optimized production-grade client static bundle and bundles the server script with esbuild.
```bash
# Compile and Bundle
npm run build

# Start optimized server
npm start
```

## LICENSE
Apache 2.0 License

---

