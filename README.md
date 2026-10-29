# Mandelbulb Explorer 🌌

An interactive, real-time 3D **Mandelbulb Fractal Explorer** rendered with custom WebGL raymarching shaders, dynamic ambient occlusion, procedural volumetric fog, generative ambient soundscapes, biophilic stress-reduction algorithms, and a live **Web Audio API analyzer** that powers audio-reactive orbit traps and song recognition.

---

## ✨ Features

- **Raw WebGL Raymarching Shader & Distance Estimator**:
  - Real-time 3D raymarching with analytical distance estimation for the Mandelbulb fractal.
  - Dynamic fractal iteration, surface normal computation, soft shadows, and specular lighting.
  - Realistic **Ambient Occlusion (AO)** with real-time intensity modulation.
  - Volumetric fog density and atmospheric wind simulation.
  - Procedural wireframe visualization mode.

- **🔬 NotebookLM Masterclass Mathematical Topologies**:
  - **Dynamic Spherical Power Drive ($n \in [2.0, 16.0]$)**: Morph in real-time from smooth cardioid bulbs ($n=2$) to the classic White & Nylander Mandelbulb ($n=8$) to hyper-crystalline needles ($n=16$).
  - **Orbit Traps for Audio-Reactive Surface Coloration**:
    - **Bass Frequencies (20–250 Hz)**: Illuminates deep interior caverns via depth orbit traps.
    - **Treble Harmonics (2000+ Hz)**: Ignites crystalline surface highlights and iridescent rim glints.
  - **Formula Architecture**:
    - **Mode 0**: Classic White & Nylander (2009) triplex spherical algebra ($Z^n + C$).
    - **Mode 1**: 3D Julia Morph coordinate offset ($Z^n + K$) creating hollow crystal palaces.
    - **Mode 2**: Biophilic Harmonic Wave Perturbation ($Z^n + \sin(\omega Z) + C$).

- **🌿 Biophilic Stress-Reduction & Smart TV Exhibition Mode**:
  - Targets the **"Stress-Reduction Zone" ($D \approx 1.3 - 1.5$)**: Research shows viewers experience peak alpha-wave activity (8–12 Hz wakeful relaxation) when observing fractals with mid-range dimensions.
  - **TV Exhibition Mode**: Borderless, cinematic presentation with gentle auto-orbit camera drift and large readable HUD.
  - **Decoupled Geometry & Audio**: Keeps structural fractal dimension steady while acoustic frequencies dynamically modulate lighting, camera momentum, and orbit traps without visual fatigue.

- **📚 Interactive Pedagogical Learning Cards ("Science Behind It")**:
  - **From 2D to 3D**: Benoit Mandelbrot's 1980 2D formula ($Z = Z^2 + C$) extended to 3D in 2009 by Daniel White & Paul Nylander.
  - **Why Fractals Relax the Brain**: Biophilic alpha-wave activation in the human visual cortex.
  - **The Escape-Time Algorithm**: Testing points in space for escape to infinity ($|Z| > 2$).
  - **Raymarching & Distance Estimation**: How the GPU shoots light rays and uses derivatives ($dr$) to step safely.
  - **Orbit Traps & Acoustics**: How sound frequencies paint geometry in real time.

- **🎙️ Web Audio Reactive Engine & Track Recognition**:
  - Live microphone and room audio analysis via the Web Audio API.
  - **Gemini Track Radar**: Identifies acoustic environments and syncs fractal parameters to song characteristics.
  - **Instant Demo Playlist**: 1-click curated tracks (*Interstellar*, *Daft Punk*, *Pink Floyd*, *Debussy*) with procedural rhythm synthesis for instant Smart TV testing without a mic.
  - **Now Playing Card**: Glassmorphism HUD card with live visualizer bars, BPM, key, and album artwork.

- **📱 Seamless Phone & Big Screen Experience**:
  - **Mobile Touch Controls**: 1-finger swipe to rotate, 2-finger pinch to zoom, and touch-drag steering on the 3D spherical minimap.
  - **Cast to TV**: Use your phone as a handheld remote and audio receiver while broadcasting 4K visuals to your TV.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling & Animations**: [Tailwind CSS v4](https://tailwindcss.com/), [Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Graphics**: Raw WebGL (GLSL Fragment & Vertex Shaders)
- **Audio Processing**: Web Audio API (`AudioContext`, `AnalyserNode`, `MediaStreamAudioSourceNode`)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- `npm` or `bun` / `pnpm`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/mandelbulb-explorer.git
   cd mandelbulb-explorer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000`.

### Building for Production

```bash
npm run build
```

---

## 🎮 Controls & Interactions

| Action | Desktop | Phone / Tablet | Smart TV / Cast |
|---|---|---|---|
| **Rotate Camera** | Click & drag viewport | 1-finger swipe | Auto-orbit cinematic drift |
| **Zoom In / Out** | Mouse wheel or slider | 2-finger pinch | Auto-zoom bass impulse |
| **Spherical Minimap** | Click/drag 3D sphere | Thumb drag on sphere | HUD coordinate telemetry |
| **TV Exhibition Mode** | Click **TV Exhibition** | Tap TV button | Borderless auto-roam |
| **Science Cards** | Click **Science** | Tap Science pill | Modal with card tabs |
| **Audio Reactivity** | Toggle **Live Sync** | Mic permission popup | Room audio via phone mic |
| **Instant Demo Stems** | Click track in Audio tab | Tap Demo track | 1-click synthesized sync |

---

## 📄 License

This project is licensed under the Apache 2.0 License.
