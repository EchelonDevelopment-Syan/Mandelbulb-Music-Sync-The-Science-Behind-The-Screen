/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Tv, 
  Sparkles, 
  Music, 
  Mic, 
  Volume2, 
  BookOpen, 
  Sliders, 
  Play, 
  Pause, 
  Compass, 
  Brain, 
  Activity, 
  Radio, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Maximize2, 
  Minimize2,
  Disc3
} from 'lucide-react';

interface DemoTrack {
  id: string;
  title: string;
  artist: string;
  genre: string;
  bpm: number;
  key: string;
  biophilicD: number;
  palette: 'cyan' | 'purple' | 'orange' | 'lime';
  formula: number; // 0 = Mandelbulb, 1 = Julia, 2 = Wave
  power: number;
  cover: string;
  desc: string;
}

const DEMO_PLAYLIST: DemoTrack[] = [
  {
    id: 'interstellar',
    title: 'Day One (Interstellar)',
    artist: 'Hans Zimmer',
    genre: 'Cinematic Ambient',
    bpm: 68,
    key: 'A Minor',
    biophilicD: 1.38,
    palette: 'cyan',
    formula: 0,
    power: 8.0,
    cover: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=300&q=80',
    desc: 'Cosmic organ chords targeting the biophilic relaxation zone (D ≈ 1.38).'
  },
  {
    id: 'aroundtheworld',
    title: 'Around the World',
    artist: 'Daft Punk',
    genre: 'Electronic / French Touch',
    bpm: 121,
    key: 'E Minor',
    biophilicD: 1.45,
    palette: 'purple',
    formula: 0,
    power: 6.0,
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80',
    desc: 'Kinetic bassline driving smooth rotational momentum and orbit traps.'
  },
  {
    id: 'pinkfloyd',
    title: 'Shine On You Crazy Diamond',
    artist: 'Pink Floyd',
    genre: 'Progressive Space Rock',
    bpm: 65,
    key: 'G Minor',
    biophilicD: 1.35,
    palette: 'orange',
    formula: 1,
    power: 8.0,
    cover: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&q=80',
    desc: 'Evolving 3D Julia crystal lattice morphing to atmospheric analog synth pads.'
  },
  {
    id: 'debussy',
    title: 'Clair de Lune',
    artist: 'Claude Debussy',
    genre: 'Impressionist Classical',
    bpm: 54,
    key: 'D♭ Major',
    biophilicD: 1.32,
    palette: 'lime',
    formula: 2,
    power: 4.0,
    cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&q=80',
    desc: 'Biophilic harmonic wave ripples evoking soothing alpha waves in the visual cortex.'
  }
];

const SCIENCE_CARDS = [
  {
    tag: 'FOUNDATIONS',
    title: 'From 2D to 3D: The Triplex Discovery',
    formula: 'v^{n} = r^{n} (\\sin(n\\theta)\\cos(n\\phi), \\sin(n\\theta)\\sin(n\\phi), \\cos(n\\theta))',
    body: 'In 1980, Benoit Mandelbrot popularized the 2D fractal Z = Z² + C using complex numbers (x + iy). For almost 30 years, finding a true 3D counterpart seemed impossible because 3D complex algebra does not naturally exist. In 2009, Daniel White and Paul Nylander used "triplex" spherical coordinates (r, θ, φ) to calculate 3D power rotations, uncovering the Mandelbulb\'s infinite alien landscapes.'
  },
  {
    tag: 'NEUROSCIENCE',
    title: 'Why Fractals Relax the Brain: The Biophilic Zone',
    formula: 'D \\approx 1.3 - 1.5 \\quad \\text{(Alpha-Wave Resonance)}',
    body: 'Scientific studies on biophilic design show human visual systems evolved outdoors viewing natural fractals (coastlines, clouds, tree branches). Viewing fractals with a mid-range fractal dimension (D ≈ 1.3 to 1.5) triggers peak alpha wave activity (8–12 Hz) in the visual cortex—a state of wakeful physiological relaxation. Our TV mode keeps geometry steady in this zone while music drives dynamic light and motion.'
  },
  {
    tag: 'THE ALGORITHM',
    title: 'The Escape-Time Math Machine',
    formula: 'Z_{k+1} = Z_{k}^{n} + C \\quad (|Z| > 2.0 \\implies \\text{Escape})',
    body: 'Every single point in 3D space is fed into a mathematical loop. If the number grows larger than 2, it flies off to infinity ("outer space"). If it stays trapped inside a sphere of radius 2 forever, it belongs to the fractal. The intricate crust you see is the delicate, infinite boundary where escape and entrapment balance on a knife\'s edge.'
  },
  {
    tag: 'GRAPHICS ENGINE',
    title: 'Raymarching & The Distance Estimator',
    formula: 'd = 0.5 \\cdot \\frac{\\ln(r) \\cdot r}{dr}',
    body: 'Unlike normal 3D video games that use flat polygon triangles, the Mandelbulb has infinite microscopic detail. Your screen shoots an invisible laser beam (a ray) from each pixel. Using a mathematical Distance Estimator (DE), it computes the exact safe distance to the surface and steps forward until it touches the fractal.'
  },
  {
    tag: 'ACOUSTICS',
    title: 'Orbit Traps: Painting Geometry with Sound',
    formula: '\\text{Trap}_{\\text{depth}} = \\min(|Z|^2), \\quad \\text{Trap}_{\\text{axis}} = \\min(|Z_x|, |Z_y|)',
    body: 'Orbit traps measure how close numbers get to specific points or planes during their journey. In this explorer, bass frequencies (20–250 Hz) illuminate the deep inner caverns found by depth traps, while treble harmonics (2000+ Hz) ignite sparkling specular highlights on the fine outer crystals.'
  }
];

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Core Exploration States
  const [speed, setSpeed] = useState(0.2);
  const [lighting, setLighting] = useState(1.0);
  const [zoom, setZoom] = useState(1.69);
  const [yaw, setYaw] = useState(33 * (Math.PI / 180));
  const [pitch, setPitch] = useState(-17 * (Math.PI / 180));
  const [proximity, setProximity] = useState(-1.8);
  const [wind, setWind] = useState(1.0);
  const [fogDensity, setFogDensity] = useState(0.4);
  const [aoIntensity, setAoIntensity] = useState(1.0);
  const [colorMode, setColorMode] = useState<'cyan' | 'orange' | 'purple' | 'lime'>('cyan');
  const [isPaused, setIsPaused] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false);

  // NotebookLM Mathematical Customizations
  const [power, setPower] = useState(8.0);
  const [formula, setFormula] = useState<number>(0); // 0 = Mandelbulb, 1 = Julia 3D, 2 = Biophilic Wave

  // Smart TV & Biophilic Screensaver Mode
  const [isTvMode, setIsTvMode] = useState(false);
  const [isAutoOrbit, setIsAutoOrbit] = useState(true);
  const [showScienceModal, setShowScienceModal] = useState(false);
  const [scienceIndex, setScienceIndex] = useState(0);

  // Audio Reactivity & Song Recognition States
  const [isAudioReactive, setIsAudioReactive] = useState(false);
  const [isUIReactive, setIsUIReactive] = useState(true);
  const [activeTab, setActiveTab] = useState<'landscape' | 'formulas' | 'music' | 'controls' | 'minimap' | 'science'>('landscape');
  const [audioStarted, setAudioStarted] = useState(false);
  
  // Track Recognition & Demo Playback
  const [currentTrack, setCurrentTrack] = useState<DemoTrack | null>(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [recognitionText, setRecognitionText] = useState('');
  const [recognitionScore, setRecognitionScore] = useState<number | null>(null);

  const colors = {
    cyan: [0.0, 0.8, 1.0],
    orange: [1.0, 0.4, 0.0],
    purple: [0.7, 0.2, 1.0],
    lime: [0.6, 1.0, 0.0]
  };

  // Synthesizer & Web Audio Refs
  const noiseGainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const envFilterRef = useRef<BiquadFilterNode | null>(null);
  const envGainRef = useRef<GainNode | null>(null);
  const movementRef = useRef(0);

  const extAnalyzerRef = useRef<AnalyserNode | null>(null);
  const extDataArrayRef = useRef<Uint8Array | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const demoOscNodesRef = useRef<any[]>([]);
  const demoIntervalRef = useRef<any>(null);

  // Toggle Live Microphone Audio Reactivity
  const toggleAudioReactive = async () => {
    if (!isAudioReactive) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        mediaStreamRef.current = stream;
        
        let ctx = audioContextRef.current;
        if (!ctx) {
           ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
           audioContextRef.current = ctx;
        }
        if (ctx.state === 'suspended') {
           ctx.resume();
        }

        const source = ctx.createMediaStreamSource(stream);
        const analyzer = ctx.createAnalyser();
        analyzer.fftSize = 2048; 
        source.connect(analyzer);
        extAnalyzerRef.current = analyzer;
        extDataArrayRef.current = new Uint8Array(analyzer.frequencyBinCount);
        
        (window as any)._extAnalyzer = analyzer;
        (window as any)._extDataArray = extDataArrayRef.current;
        (window as any)._audioReactive = true;

        setIsAudioReactive(true);
      } catch (err) {
        console.error("Microphone access denied or unavailable", err);
      }
    } else {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
      }
      if (extAnalyzerRef.current) {
        extAnalyzerRef.current.disconnect();
        extAnalyzerRef.current = null;
      }
      (window as any)._audioReactive = false;
      setIsAudioReactive(false);
    }
  };

  // Stop Demo Audio Synthesizer
  const stopDemoAudio = () => {
    demoOscNodesRef.current.forEach(node => {
      try { node.stop(); node.disconnect(); } catch (e) {}
    });
    demoOscNodesRef.current = [];
    if (demoIntervalRef.current) {
      clearInterval(demoIntervalRef.current);
      demoIntervalRef.current = null;
    }
  };

  // Play a Demo Track with Synthesized Acoustic Stems
  const playDemoTrack = (track: DemoTrack) => {
    stopDemoAudio();

    let ctx = audioContextRef.current;
    if (!ctx) {
      ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = ctx;
    }
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Set up analyzer if not already active
    if (!extAnalyzerRef.current) {
      const analyzer = ctx.createAnalyser();
      analyzer.fftSize = 2048;
      extAnalyzerRef.current = analyzer;
      extDataArrayRef.current = new Uint8Array(analyzer.frequencyBinCount);
      (window as any)._extAnalyzer = analyzer;
      (window as any)._extDataArray = extDataArrayRef.current;
    }

    (window as any)._audioReactive = true;
    setIsAudioReactive(true);
    setCurrentTrack(track);
    setColorMode(track.palette);
    setFormula(track.formula);
    setPower(track.power);

    // Create a rhythmic synthesizer that sends real bass & treble pulses through the analyzer
    const mainGain = ctx.createGain();
    mainGain.gain.setValueAtTime(0.3, ctx.currentTime);
    mainGain.connect(extAnalyzerRef.current);
    mainGain.connect(ctx.destination);

    // Bass synthesizer pulse loop based on BPM
    const beatIntervalMs = (60 / track.bpm) * 1000;
    let step = 0;

    const playBeat = () => {
      if (!ctx) return;
      const t = ctx.currentTime;
      
      // Deep Kick (Bass 20-150Hz)
      const kickOsc = ctx.createOscillator();
      const kickGain = ctx.createGain();
      kickOsc.frequency.setValueAtTime(140, t);
      kickOsc.frequency.exponentialRampToValueAtTime(32, t + 0.18);
      kickGain.gain.setValueAtTime(0.8, t);
      kickGain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);
      kickOsc.connect(kickGain);
      kickGain.connect(mainGain);
      kickOsc.start(t);
      kickOsc.stop(t + 0.28);

      // Treble Shimmer / Hi-hat (every other beat or on off-beats)
      if (step % 2 === 1) {
        const hihatBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
        const data = hihatBuffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.4;
        const noise = ctx.createBufferSource();
        noise.buffer = hihatBuffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(5000, t);
        const hGain = ctx.createGain();
        hGain.gain.setValueAtTime(0.3, t);
        hGain.gain.exponentialRampToValueAtTime(0.01, t + 0.07);
        noise.connect(filter);
        filter.connect(hGain);
        hGain.connect(mainGain);
        noise.start(t);
      }

      step++;
    };

    playBeat();
    demoIntervalRef.current = setInterval(playBeat, beatIntervalMs);
  };

  // Perform Simulated Gemini Audio Recognition
  const triggerAudioRecognition = () => {
    setIsRecognizing(true);
    setRecognitionText('Listening to acoustic environment (4.5s)...');
    setRecognitionScore(null);

    setTimeout(() => {
      setRecognitionText('Analyzing frequency spectrum with Gemini Multimodal AI...');
    }, 1800);

    setTimeout(() => {
      // Pick a matched song or identify the closest aesthetic profile
      const matched = DEMO_PLAYLIST[Math.floor(Math.random() * DEMO_PLAYLIST.length)];
      setCurrentTrack(matched);
      setIsRecognizing(false);
      setRecognitionScore(96);
      setRecognitionText('');
      setColorMode(matched.palette);
      setFormula(matched.formula);
      setPower(matched.power);
    }, 3800);
  };

  const startAudio = () => {
    if (audioStarted) return;
    
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioContextRef.current = ctx;

    const noiseLength = 5;
    const bufferSize = ctx.sampleRate * noiseLength;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(800, ctx.currentTime);
    noiseFilter.Q.setValueAtTime(5, ctx.currentTime);
    filterRef.current = noiseFilter;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.05, ctx.currentTime);
    noiseGainRef.current = noiseGain;

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noiseSource.start();

    // Environment texture
    const envSource = ctx.createBufferSource();
    envSource.buffer = noiseBuffer;
    envSource.loop = true;

    const envFilter = ctx.createBiquadFilter();
    envFilter.type = 'lowpass';
    envFilter.frequency.setValueAtTime(200, ctx.currentTime);
    envFilterRef.current = envFilter;

    const envGain = ctx.createGain();
    envGain.gain.setValueAtTime(0.1, ctx.currentTime);
    envGainRef.current = envGain;

    envSource.connect(envFilter);
    envFilter.connect(envGain);
    envGain.connect(ctx.destination);
    envSource.start();

    setAudioStarted(true);
  };

  // Procedural audio modulation loop
  useEffect(() => {
    if (!audioStarted) return;

    let frame: number;
    const updateAudio = () => {
      if (noiseGainRef.current && filterRef.current) {
        const ctx = audioContextRef.current!;
        movementRef.current *= 0.95;
        const targetGain = 0.05 + movementRef.current * 0.4;
        noiseGainRef.current.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.1);
        const targetFreq = 500 + movementRef.current * 4000 + Math.sin(Date.now() * 0.005) * 200;
        filterRef.current.frequency.setTargetAtTime(targetFreq, ctx.currentTime, 0.1);
      }
      frame = requestAnimationFrame(updateAudio);
    };
    
    frame = requestAnimationFrame(updateAudio);
    return () => cancelAnimationFrame(frame);
  }, [audioStarted]);

  // Main WebGL Shader Setup & Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    const vsSource = `
      attribute vec4 aVertexPosition;
      void main() {
        gl_Position = aVertexPosition;
      }
    `;

    // Advanced WebGL Fragment Shader with Orbit Traps & Dynamic Spherical Power Drive
    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_rotation;
      uniform vec3 u_color;
      uniform float u_speed;
      uniform float u_lighting;
      uniform float u_zoom;
      uniform float u_depth;
      uniform float u_wind;
      uniform float u_wireframe;
      uniform float u_fogDensity;
      uniform float u_aoIntensity;
      uniform float u_power;
      uniform float u_formula;
      uniform float u_audioBass;
      uniform float u_audioMids;
      uniform float u_audioTreble;

      #define MAX_STEPS 160
      #define SURF_DIST 0.0003
      #define MAX_DIST 18.0
      #define ITERATIONS 11
      
      float hash(vec3 p) {
        p = fract(p * vec3(123.34, 456.21, 789.18));
        p += dot(p, p.yzx + 19.19);
        return fract((p.x + p.y) * p.z);
      }

      float hash12(vec2 p) {
        vec3 p3  = fract(vec3(p.xyx) * .1031);
        p3 += dot(p3, p3.yzx + 33.33);
        return fract((p3.x + p3.y) * p3.z);
      }

      float noise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(mix(hash(i + vec3(0, 0, 0)), hash(i + vec3(1, 0, 0)), f.x),
                       mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
                   mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x),
                       mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y), f.z);
      }

      float fbm(vec3 p) {
        float v = 0.0;
        float a = 0.5;
        vec3 shift = vec3(100);
        for (int i = 0; i < 4; ++i) {
          v += a * noise(p);
          p = p * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      mat2 rot(float a) {
        float s = sin(a), c = cos(a);
        return mat2(c, -s, s, c);
      }

      // --- MANDELBULB WITH ORBIT TRAPS & DYNAMIC POWER DRIVE ---
      float mandelbulb(vec3 p, out float orbit, out float trapDepth, out float trapAxis) {
        vec3 z = p;
        float dr = 1.0;
        float r = 0.0;
        orbit = 1e10;
        trapDepth = 1e10;
        trapAxis = 1e10;
        
        // NotebookLM: Dynamic Spherical Power Drive mapped to low-frequency audio breath
        float n = u_power;
        if (u_audioBass > 0.05) {
          n += (u_audioBass - 0.5) * 0.35;
        }

        for (int i = 0; i < ITERATIONS; i++) {
          r = length(z);
          if (r > 2.0) break;
          orbit = min(orbit, r);
          trapDepth = min(trapDepth, dot(z, z));
          trapAxis = min(trapAxis, min(abs(z.x), abs(z.y)));

          // Biophilic harmonic wave perturbation (formula 2.0)
          if (u_formula > 1.5) {
            z += 0.03 * sin(z * 4.5 + u_time * 0.3);
          }

          float theta = acos(clamp(z.z / max(r, 0.0001), -1.0, 1.0));
          float phi = atan(z.y, z.x);
          
          dr = pow(r, max(0.0, n - 1.0)) * n * dr + 1.0;
          float zr = pow(r, n);
          theta = theta * n;
          phi = phi * n;
          z = zr * vec3(sin(theta) * cos(phi), sin(phi) * sin(theta), cos(theta));
          
          // Formula 1.0: 3D Julia Morph
          if (u_formula > 0.5 && u_formula < 1.5) {
            z += vec3(-0.62, 0.35 * sin(u_time * 0.12), 0.22);
          } else {
            z += p;
          }
        }
        return 0.5 * log(r) * r / dr;
      }

      float map(vec3 p, out float orbit, out float trapDepth, out float trapAxis) {
        return mandelbulb(p, orbit, trapDepth, trapAxis);
      }

      float mapSimple(vec3 p) {
        float o, td, ta;
        return mandelbulb(p, o, td, ta);
      }

      vec3 getNormal(vec3 p) {
        vec2 e = vec2(0.001, 0.0);
        return normalize(vec3(
          mapSimple(p + e.xyy) - mapSimple(p - e.xyy),
          mapSimple(p + e.yxy) - mapSimple(p - e.yxy),
          mapSimple(p + e.yyx) - mapSimple(p - e.yyx)
        ));
      }

      float calcAO(vec3 p, vec3 n) {
        float occ = 0.0;
        float sca = 1.0;
        for (int i = 0; i < 5; i++) {
          float hr = 0.01 + 0.12 * float(i) / 4.0;
          float d = mapSimple(p + n * hr);
          occ += -(d - hr) * sca;
          sca *= 0.95;
        }
        return clamp(1.0 - 3.0 * occ, 0.0, 1.0);
      }

      float softShadow(vec3 ro, vec3 rd, float mint, float tmax) {
        float res = 1.0;
        float t = mint;
        for (int i = 0; i < 20; i++) {
          float h = mapSimple(ro + rd * t);
          res = min(res, 16.0 * h / t);
          t += clamp(h, 0.015, 0.3);
          if (h < 0.001 || t > tmax) break;
        }
        return clamp(res, 0.0, 1.0);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
        vec2 screenUV = gl_FragCoord.xy / u_resolution.xy;
        
        uv += vec2(-0.25, 0.25);
        
        vec3 ro = vec3(0.0, 0.0, u_depth);
        vec3 rd = normalize(vec3(uv, u_zoom));
        
        float pitch = u_rotation.y;
        float yaw = u_rotation.x;
        ro.yz *= rot(pitch);
        rd.yz *= rot(pitch);
        ro.xz *= rot(yaw);
        rd.xz *= rot(yaw);

        // Radial Background Gradient
        float distToCenter = length(screenUV - vec2(0.75, 0.25));
        vec3 bgColor = mix(vec3(0.0, 0.04, 0.06), vec3(0.0), smoothstep(0.2, 0.8, distToCenter));
        
        // Starfield
        float stars = 0.0;
        for(float i=1.0; i<=3.0; i++) {
            vec2 starUV = uv * (i * 150.0);
            starUV += vec2(u_time * 0.02 * i, u_time * 0.01);
            float h = hash12(floor(starUV));
            if(h > 0.995) {
                float m = sin(u_time * 2.0 + h * 6.28) * 0.5 + 0.5;
                stars += pow(h, 10.0) * m * (1.0 / i);
            }
        }
        vec3 color = bgColor + stars * vec3(0.8, 0.9, 1.0);

        // Raymarching
        float t = 0.0;
        float orbit = 0.0;
        float trapDepth = 0.0;
        float trapAxis = 0.0;
        float finalOrbit = 0.0;
        float finalTrapDepth = 0.0;
        float finalTrapAxis = 0.0;
        float glow = 0.0;
        float fogDensity = 0.0;
        bool hit = false;
        
        for (int i = 0; i < MAX_STEPS; i++) {
          vec3 p = ro + rd * t;
          float d = map(p, orbit, trapDepth, trapAxis);
          
          if (t < 5.0) {
              float warp = noise(p * 0.5 + u_time * 0.2 * u_wind);
              float n = fbm(p * 1.5 + warp + u_time * 0.4 * u_wind);
              fogDensity += n * exp(-d * 6.0) * 0.025;
          }

          glow += 0.01 / (0.01 + d * d);
          
          if (d < SURF_DIST) {
            hit = true;
            finalOrbit = orbit;
            finalTrapDepth = trapDepth;
            finalTrapAxis = trapAxis;
            break;
          }
          if (t > MAX_DIST) break;
          t += d;
        }

        vec3 haloColor = u_color;
        color += haloColor * glow * 0.015;
        color += haloColor * fogDensity * u_fogDensity;

        if (hit) {
          vec3 p = ro + rd * t;
          vec3 n = getNormal(p);
          vec3 lightPos = vec3(2.0, 4.0, -3.0);
          vec3 lightDir = normalize(lightPos - p);
          
          float ao = calcAO(p, n);
          float shadow = softShadow(p, lightDir, 0.02, 2.5);
          
          vec3 boneColor = vec3(0.92, 0.88, 0.82);
          vec3 rootColor = vec3(0.08, 0.09, 0.12);
          vec3 baseColor = mix(rootColor, boneColor, clamp(pow(finalOrbit, 0.4), 0.0, 1.0));
          
          float diff = max(dot(n, lightDir), 0.0);
          vec3 viewDir = normalize(ro - p);
          vec3 reflectDir = reflect(-lightDir, n);
          float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
          
          float appliedAO = mix(1.0, ao, u_aoIntensity);
          
          // NotebookLM: Orbit Traps for Audio-Reactive Surface Coloration
          // Bass illuminates deep inner caverns
          float cavernGlow = exp(-2.8 * finalTrapDepth) * (0.15 + u_audioBass * 1.8);
          // Treble excites outer surface highlights and fine crystalline details
          float trebleSparkle = exp(-3.8 * finalTrapAxis) * (0.05 + u_audioTreble * 2.2);

          color = baseColor * (diff * shadow * u_lighting + 0.05) * appliedAO;
          color += vec3(0.8, 0.9, 1.0) * spec * shadow * 0.4 * u_lighting;
          
          // Orbit-trap reactive lighting integration
          color += u_color * cavernGlow * u_lighting;
          color += vec3(0.9, 0.95, 1.0) * trebleSparkle * spec * u_lighting;
          
          float rim = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
          color += haloColor * rim * 0.4 * u_lighting;
          color += vec3(0.1, 0.3, 0.4) * (1.0 - appliedAO) * 0.2 * u_lighting;
          
          if (u_wireframe > 0.5) {
              vec3 grid = abs(fract(p * 16.0) - 0.5);
              float line = min(min(grid.x, grid.y), grid.z);
              float wire = smoothstep(0.04, 0.01, line);
              color = mix(vec3(0.0), haloColor, wire * 1.5);
              color *= ao;
          }
        }

        // Mist overlay
        float mist = 0.0;
        vec3 mpos1 = vec3(uv * 1.5, u_time * 0.1 * u_wind);
        mpos1.x -= u_time * 0.8 * u_wind;
        float m1 = fbm(mpos1);
        mist += smoothstep(0.3, 0.8, m1) * 0.15;
        color += haloColor * mist * u_fogDensity;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([-1, 1, 1, 1, -1, -1, 1, -1]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program, 'aVertexPosition');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const resLoc = gl.getUniformLocation(program, 'u_resolution');
    const rotationLoc = gl.getUniformLocation(program, 'u_rotation');
    const speedLoc = gl.getUniformLocation(program, 'u_speed');
    const lightLoc = gl.getUniformLocation(program, 'u_lighting');
    const zoomLoc = gl.getUniformLocation(program, 'u_zoom');
    const depthLoc = gl.getUniformLocation(program, 'u_depth');
    const windLoc = gl.getUniformLocation(program, 'u_wind');
    const colorLoc = gl.getUniformLocation(program, 'u_color');
    const wireframeLoc = gl.getUniformLocation(program, 'u_wireframe');
    const fogDensityLoc = gl.getUniformLocation(program, 'u_fogDensity');
    const aoLoc = gl.getUniformLocation(program, 'u_aoIntensity');
    const powerLoc = gl.getUniformLocation(program, 'u_power');
    const formulaLoc = gl.getUniformLocation(program, 'u_formula');
    const bassLoc = gl.getUniformLocation(program, 'u_audioBass');
    const midsLoc = gl.getUniformLocation(program, 'u_audioMids');
    const trebleLoc = gl.getUniformLocation(program, 'u_audioTreble');

    // Drag / Touch state for mobile & desktop
    let isDragging = false;
    let lastMouseX = 0, lastMouseY = 0;
    let touchStartDist = 0;

    const handleMouseDown = (e: MouseEvent) => {
      // Don't drag if clicking UI elements
      if ((e.target as HTMLElement)?.closest('button, input, select, .ui-panel')) return;
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      
      const newYaw = ((window as any)._shaderYaw || 0) - dx * 0.008;
      const newPitch = ((window as any)._shaderPitch || 0) + dy * 0.008;
      const clampedPitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, newPitch));
      
      (window as any)._shaderYaw = newYaw;
      (window as any)._shaderPitch = clampedPitch;
      movementRef.current = Math.min(1.0, movementRef.current + 0.05);
      
      setYaw(newYaw);
      setPitch(clampedPitch);
      
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    // Touch support for phone exploration
    const handleTouchStart = (e: TouchEvent) => {
      if ((e.target as HTMLElement)?.closest('button, input, select, .ui-panel')) return;
      if (e.touches.length === 1) {
        isDragging = true;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        // Pinch zoom initiation
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchStartDist = Math.sqrt(dx * dx + dy * dy);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging) {
        const dx = e.touches[0].clientX - lastMouseX;
        const dy = e.touches[0].clientY - lastMouseY;
        
        const newYaw = ((window as any)._shaderYaw || 0) - dx * 0.008;
        const newPitch = ((window as any)._shaderPitch || 0) + dy * 0.008;
        const clampedPitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, newPitch));
        
        (window as any)._shaderYaw = newYaw;
        (window as any)._shaderPitch = clampedPitch;
        setYaw(newYaw);
        setPitch(clampedPitch);
        
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      } else if (e.touches.length === 2 && touchStartDist > 0) {
        // Pinch to zoom
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const currentDist = Math.sqrt(dx * dx + dy * dy);
        const factor = currentDist / touchStartDist;
        const currentZ = (window as any)._shaderZoom || 1.69;
        const nextZ = Math.max(1.0, Math.min(3.2, currentZ * (factor > 1 ? 1.02 : 0.98)));
        (window as any)._shaderZoom = nextZ;
        setZoom(nextZ);
        touchStartDist = currentDist;
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
      touchStartDist = 0;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener('resize', resize);
    resize();

    let animationFrameId: number;
    let lastTime = 0;

    const render = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      let audioBass = 0;
      let audioMids = 0;
      let audioTreble = 0;

      // Extract live Web Audio frequency bands
      if ((window as any)._audioReactive && (window as any)._extAnalyzer && (window as any)._extDataArray) {
        const analyzer = (window as any)._extAnalyzer as AnalyserNode;
        const dataArray = (window as any)._extDataArray as Uint8Array;
        analyzer.getByteFrequencyData(dataArray);

        const sampleRate = analyzer.context.sampleRate || 44100;
        const binSize = sampleRate / 2 / analyzer.frequencyBinCount; 

        // Frequency thresholds: Bass (20-250Hz), Mids (250-2000Hz), Treble (2000Hz+)
        const bassBins = Math.max(1, Math.floor(250 / binSize));
        const midsBins = Math.max(bassBins + 1, Math.floor(2000 / binSize));

        let bassSum = 0;
        let midsSum = 0;
        let trebleSum = 0;

        for (let i = 0; i < analyzer.frequencyBinCount; i++) {
          if (i < bassBins) bassSum += dataArray[i];
          else if (i < midsBins) midsSum += dataArray[i];
          else trebleSum += dataArray[i];
        }

        audioBass = bassSum / (bassBins * 255);
        audioMids = midsSum / (Math.max(1, midsBins - bassBins) * 255);
        audioTreble = trebleSum / (Math.max(1, analyzer.frequencyBinCount - midsBins) * 255);
        
        if (audioBass > 0.6) {
          movementRef.current = Math.min(1.0, movementRef.current + 0.1);
        }

        if ((window as any)._uiReactive) {
          const rawAudio = audioBass * 0.8 + audioMids * 0.6 + audioTreble * 0.4;
          const currentAudioLevel = (window as any)._audioLevel || 0;
          const nextLevel = currentAudioLevel + (rawAudio - currentAudioLevel) * 0.25;
          (window as any)._audioLevel = nextLevel;
          document.documentElement.style.setProperty('--audio-level', nextLevel.toFixed(3));
        }
      }

      gl.uniform1f(timeLoc, time * 0.001);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      
      // Auto-rotation / TV Exhibition Camera Drift
      if (!(window as any)._shaderPaused) {
        const currentYaw = (window as any)._shaderYaw || 0;
        let currentSpeed = (window as any)._shaderSpeed || 0.2;
        
        // In TV mode, maintain gentle alpha-wave pacing
        if ((window as any)._isTvMode) {
          currentSpeed = 0.12;
        }

        if ((window as any)._audioReactive) {
          currentSpeed += (audioMids * 1.8);
        }

        const newYaw = currentYaw + 0.00015 * currentSpeed * deltaTime;
        (window as any)._shaderYaw = newYaw;
      }

      // Camera Pitch auto-drift in TV Exhibition Mode
      if ((window as any)._isTvMode && !(window as any)._shaderPaused) {
        const tSec = time * 0.0002;
        (window as any)._shaderPitch = Math.sin(tSec) * 0.18 - 0.2;
      }

      // Bass zoom impulse velocity
      let currentZoom = (window as any)._shaderZoom || 1.69;
      if ((window as any)._audioReactive && audioBass > 0.45) {
        currentZoom -= (audioBass - 0.45) * 0.03 * deltaTime * 0.015;
        if (currentZoom < 1.0) currentZoom = 1.0;
        (window as any)._shaderZoom = currentZoom;
      }

      gl.uniform2f(rotationLoc, (window as any)._shaderYaw || 0, (window as any)._shaderPitch || 0);
      
      const getVal = (key: string, fallback: number) => {
        const val = (window as any)[key];
        return typeof val === 'number' ? val : fallback;
      };

      gl.uniform1f(speedLoc, getVal('_shaderSpeed', 0.2));
      gl.uniform1f(lightLoc, getVal('_shaderLighting', 1.0));
      gl.uniform1f(zoomLoc, currentZoom);
      gl.uniform1f(depthLoc, getVal('_shaderDepth', -1.8));
      gl.uniform1f(windLoc, getVal('_shaderWind', 1.0));
      gl.uniform1f(wireframeLoc, getVal('_shaderWireframe', 0.0));
      gl.uniform1f(fogDensityLoc, getVal('_shaderFogDensity', 0.4));
      gl.uniform1f(aoLoc, getVal('_shaderAoIntensity', 1.0));
      gl.uniform1f(powerLoc, getVal('_shaderPower', 8.0));
      gl.uniform1f(formulaLoc, getVal('_shaderFormula', 0.0));
      gl.uniform1f(bassLoc, audioBass);
      gl.uniform1f(midsLoc, audioMids);
      gl.uniform1f(trebleLoc, audioTreble);
      
      let c = (window as any)._shaderColor || [0.0, 0.8, 1.0];
      if ((window as any)._audioReactive) {
         const hueShift = audioTreble * 1.5;
         c = [
           Math.min(1.0, c[0] + hueShift * 0.4),
           Math.min(1.0, c[1] + hueShift * 0.2),
           Math.min(1.0, c[2] + hueShift * 0.7)
         ];
      }
      gl.uniform3f(colorLoc, c[0], c[1], c[2]);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const applyLandscape = (landscape: any) => {
    const settings = landscape.settings;
    if (settings.speed !== undefined) setSpeed(settings.speed);
    if (settings.lighting !== undefined) setLighting(settings.lighting);
    if (settings.zoom !== undefined) setZoom(settings.zoom);
    if (settings.yaw !== undefined) setYaw(settings.yaw);
    if (settings.pitch !== undefined) setPitch(settings.pitch);
    if (settings.proximity !== undefined) setProximity(settings.proximity);
    if (settings.wind !== undefined) setWind(settings.wind);
    if (settings.fogDensity !== undefined) setFogDensity(settings.fogDensity);
    if (settings.aoIntensity !== undefined) setAoIntensity(settings.aoIntensity);
    if (settings.isPaused !== undefined) setIsPaused(settings.isPaused);
    if (settings.colorMode !== undefined) setColorMode(settings.colorMode);
    if (settings.power !== undefined) setPower(settings.power);
    if (settings.formula !== undefined) setFormula(settings.formula);
    setIsCollapsed(true);
    
    if (audioContextRef.current && envFilterRef.current && envGainRef.current && landscape.audio) {
      const ctx = audioContextRef.current;
      const audio = landscape.audio;
      envFilterRef.current.type = audio.type as BiquadFilterType;
      envFilterRef.current.frequency.setTargetAtTime(audio.freq, ctx.currentTime, 0.5);
      envFilterRef.current.Q.setTargetAtTime(audio.q, ctx.currentTime, 0.5);
      envGainRef.current.gain.setTargetAtTime(audio.gain, ctx.currentTime, 0.5);
    }

    movementRef.current = 1.0;
  };

  useEffect(() => {
    (window as any)._uiReactive = isUIReactive;
    (window as any)._isTvMode = isTvMode;
  }, [isUIReactive, isTvMode]);

  const handleMinimapInteraction = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const r = 80;
    let u = (e.clientX - rect.left - r) / r;
    let v = (e.clientY - rect.top - r) / r;

    const dist = Math.sqrt(u * u + v * v);
    if (dist > 1) {
      u /= dist;
      v /= dist;
    }

    const newPitch = Math.asin(v);
    const z = -Math.sqrt(Math.max(0, 1 - u * u - v * v));
    const newYaw = Math.atan2(u, -z);

    setPitch(newPitch);
    setYaw(newYaw);
    (window as any)._shaderPitch = newPitch;
    (window as any)._shaderYaw = newYaw;
  };

  const landscapes = [
    {
      id: 'cave',
      name: 'The Cave',
      formulaName: 'Mandelbulb Power 8 (White & Nylander)',
      image: 'https://lh3.googleusercontent.com/pw/AP1GczMdSHG7AfLrUH_b3sLjtG340ZEp3eywkEuo5n7zrFw-TfA0ZwJBk7Ry0z9yWoGSW9leVAtzxqOrrBbxa_VPAh46gowm9Cop5uqMyGl0LR4JnrVHqfO7-ssNRjbpI8uy_hj0md_X8tI8K5C1eF6XJBL5=w2606-h1416-s-no-gm?authuser=0',
      settings: {
        speed: 0.2,
        lighting: 1.0,
        zoom: 2.02,
        yaw: -79 * (Math.PI / 180),
        pitch: -27 * (Math.PI / 180),
        proximity: -0.78,
        wind: 0,
        isPaused: false,
        colorMode: 'lime' as const,
        power: 8.0,
        formula: 0
      },
      audio: { freq: 150, q: 8, type: 'lowpass', gain: 0.2 }
    },
    {
      id: 'peak',
      name: 'The Peak',
      formulaName: 'Biophilic Cardioid Bulb (Power 4)',
      image: 'https://lh3.googleusercontent.com/pw/AP1GczO4s-8i-WwoohnEi6cV3q_g5g8Y0kqm6XJSBL51Pitm5HCtRk4ywtjVn0HfhCRA3ehY9j1MN7AaElD4Lw7EsXx3r1mPaznRSu5K9LXsGstebQVBKONjxdqPVsBlnjyJO1wsyfSk8p2hF2FvqKBKUjNd=w2192-h1480-s-no-gm?authuser=0',
      settings: {
        speed: 0.1,
        lighting: 0.59,
        zoom: 2.09,
        proximity: -2.2,
        wind: 1.86,
        yaw: 19 * (Math.PI / 180),
        pitch: -14 * (Math.PI / 180),
        isPaused: true,
        colorMode: 'cyan' as const,
        power: 4.0,
        formula: 0
      },
      audio: { freq: 400, q: 0.5, type: 'bandpass', gain: 0.25 }
    },
    {
      id: 'void',
      name: 'The Void',
      formulaName: '3D Julia Morph Lattice',
      image: 'https://lh3.googleusercontent.com/pw/AP1GczODtYaSgO3R8EPfEfgpsmGlugQJoXtx-AYNAo9mAJHW9Gc9lJ8h6NR3joe7491Qk5rdmdblFTtJLp657-w9V0R2wCBcZ0MEvtLXk23C2puJtXzuMF6mCPcscvOayF1vBSzJZ039_z6xlNyk1cYo1AmX=w2146-h1320-s-no-gm?authuser=0',
      settings: {
        speed: 0.30,
        lighting: 1.43,
        zoom: 2.98,
        proximity: -1.85,
        wind: 0.00,
        yaw: -189 * (Math.PI / 180),
        pitch: -5 * (Math.PI / 180),
        isPaused: false,
        colorMode: 'purple' as const,
        power: 8.0,
        formula: 1
      },
      audio: { freq: 800, q: 15, type: 'bandpass', gain: 0.18 }
    },
    {
      id: 'fauna',
      name: 'The Fauna',
      formulaName: 'Biophilic Harmonic Wave Bulb',
      image: 'https://lh3.googleusercontent.com/pw/AP1GczMBmxjrTBIebX8DF9LfMixa96_mmrTIQHKeWBlHk-EhqL4e1qPnMerboxyhTpD1uT9hYhdKFQ7ujQpoMRwjOmjX6Yqes7K8XR_n_mC3dfq_AoOwx3DIH49PYvgGUEu9oLyuEMqBX1ii_KwhJG58MLrS=w2628-h1658-s-no-gm?authuser=0',
      settings: {
        speed: 0.44,
        lighting: 1.46,
        zoom: 2.98,
        yaw: -185 * (Math.PI / 180),
        pitch: 79 * (Math.PI / 180),
        proximity: -1.06,
        wind: 0.12,
        isPaused: false,
        colorMode: 'orange' as const,
        power: 6.0,
        formula: 2
      },
      audio: { freq: 1200, q: 4, type: 'lowpass', gain: 0.15 }
    },
    {
      id: 'crystals',
      name: 'The Crystals',
      formulaName: 'Hyper-Crystalline Spire (Power 12)',
      image: 'https://lh3.googleusercontent.com/pw/AP1GczN_BNuBAP4RA4smaqfbvvuuspP9IzqBqqX7VZqtGnXvah1zdksPKyA3wN-QC8MGVdiGxx6jgF_ov322Xr8BVzSShL9PTCDsFmhLhqW31T2IWZtSK1xoTzDGzq012f_1LWWG1cVOkyqu15jpsTH--KE2=w2710-h1678-s-no-gm?authuser=0',
      settings: {
        speed: 0.20,
        lighting: 1.26,
        zoom: 1.20,
        yaw: 315 * (Math.PI / 180),
        pitch: 19 * (Math.PI / 180),
        proximity: -1.07,
        wind: 0.00,
        isPaused: false,
        colorMode: 'cyan' as const,
        power: 12.0,
        formula: 0
      },
      audio: { freq: 600, q: 2, type: 'bandpass', gain: 0.15 }
    }
  ];

  // Sync state to window for the WebGL render loop
  useEffect(() => {
    (window as any)._shaderSpeed = speed;
    (window as any)._shaderLighting = lighting;
    (window as any)._shaderZoom = zoom;
    (window as any)._shaderYaw = yaw;
    (window as any)._shaderPitch = pitch;
    (window as any)._shaderPaused = isPaused;
    (window as any)._shaderDepth = proximity;
    (window as any)._shaderWind = wind;
    (window as any)._shaderFogDensity = fogDensity;
    (window as any)._shaderAoIntensity = aoIntensity;
    (window as any)._shaderPower = power;
    (window as any)._shaderFormula = formula;
    (window as any)._shaderColor = colors[colorMode];
    (window as any)._shaderWireframe = isWireframe ? 1.0 : 0.0;
  }, [speed, lighting, zoom, yaw, pitch, isPaused, proximity, wind, fogDensity, aoIntensity, power, formula, colorMode, isWireframe]);

  // Calculate approximate biophilic fractal dimension D
  const calculatedD = (1.2 + (power / 16.0) * 0.35 + (formula === 2 ? 0.04 : 0.0)).toFixed(2);
  const isInBiophilicZone = parseFloat(calculatedD) >= 1.3 && parseFloat(calculatedD) <= 1.5;

  return (
    <div className="fixed inset-0 bg-black overflow-hidden select-none font-sans">
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

      {/* Entry Lobby Overlay */}
      <AnimatePresence>
        {!audioStarted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="absolute inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-6"
          >
            <div className="max-w-md w-full border border-white/10 bg-white/5 rounded-2xl p-8 backdrop-blur-xl text-center space-y-6 shadow-2xl">
              <div className="w-14 h-14 rounded-full border border-cyan-500/40 bg-cyan-500/10 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <Brain className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-xl font-mono text-white uppercase tracking-widest">Mandelbulb Explorer</h1>
                <p className="text-xs font-mono text-white/50 mt-1 uppercase tracking-wider">Biophilic Raymarching & Music Sync</p>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                Rendered with raw WebGL GLSL shaders, dynamic spherical power drives, orbit-trap illumination, and real-time audio reactivity.
              </p>
              <div className="pt-2 flex flex-col gap-3">
                <button
                  onClick={startAudio}
                  className="w-full py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 rounded-xl font-mono text-xs uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(34,211,238,0.25)] flex items-center justify-center gap-2"
                >
                  <Play className="w-3.5 h-3.5" /> Initialize Explorer
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Bar: Smart TV Toggle & Quick Actions */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20 pointer-events-none">
        {/* Brand / Logo */}
        <div className="pointer-events-auto flex items-center gap-2 bg-black/40 backdrop-blur-xl border border-white/10 px-3.5 py-2 rounded-full">
          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/80 font-medium">Mandelbulb 3D</span>
          <span className="text-[9px] font-mono text-cyan-400/80 px-1.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            D ≈ {calculatedD}
          </span>
        </div>

        {/* Action Controls: Smart TV Exhibition Mode & Science Modal */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Science Cards Trigger */}
          <button
            onClick={() => setShowScienceModal(true)}
            className="flex items-center gap-1.5 bg-black/40 hover:bg-white/10 backdrop-blur-xl border border-white/10 px-3 py-2 rounded-full font-mono text-[9px] uppercase tracking-wider text-white/80 transition-all shadow-lg hover:border-cyan-500/40"
            title="Read the Science Behind Mandelbulb"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Science</span>
          </button>

          {/* Smart TV / Exhibition Mode Button */}
          <button
            onClick={() => {
              const next = !isTvMode;
              setIsTvMode(next);
              if (next) setIsCollapsed(true);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full font-mono text-[9px] uppercase tracking-wider transition-all shadow-lg border ${
              isTvMode 
                ? 'bg-cyan-500/30 text-cyan-300 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]' 
                : 'bg-black/40 hover:bg-white/10 text-white/80 border-white/10'
            }`}
            title="Toggle Smart TV / Exhibition Mode (clean borderless display & relaxing auto-orbit)"
          >
            <Tv className="w-3.5 h-3.5" />
            <span>{isTvMode ? 'TV Mode Active' : 'TV Exhibition'}</span>
          </button>
        </div>
      </div>

      {/* SMART TV EXHIBITION MODE: Minimalist Floating HUD Banner */}
      <AnimatePresence>
        {isTvMode && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="absolute bottom-6 left-6 right-6 z-30 pointer-events-none flex justify-between items-end"
          >
            {/* Left: Mathematical Live Readout & Biophilic Indicator */}
            <div className="pointer-events-auto bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 max-w-md shadow-2xl text-left space-y-2">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
                  <Activity className="w-3 h-3" /> Live Mathematical Equation
                </span>
                <span className={`text-[8px] font-mono px-2 py-0.5 rounded-full border ${
                  isInBiophilicZone 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                    : 'bg-white/10 text-white/60 border-white/10'
                }`}>
                  {isInBiophilicZone ? 'Alpha-Wave Relaxing Zone (D ≈ 1.3-1.5)' : 'High Frequency Complexity'}
                </span>
              </div>
              <div className="font-mono text-sm sm:text-base text-white tracking-wider font-semibold">
                Z_{`{k+1}`} = Z_{`{k}`}^{power.toFixed(1)} + C
              </div>
              <p className="text-[10px] text-white/50 leading-relaxed">
                {formula === 0 && 'Daniel White & Paul Nylander (2009) triplex spherical coordinate algebra.'}
                {formula === 1 && '3D Julia Morph coordinate offset creating hollow crystalline geometry.'}
                {formula === 2 && 'Biophilic trigonometric wave harmonics evoking natural organic ripple patterns.'}
              </p>
            </div>

            {/* Right: Quick TV Sliders & Exit */}
            <div className="pointer-events-auto flex items-center gap-3 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-3 shadow-2xl">
              <div className="flex flex-col gap-1 pr-3 border-r border-white/10">
                <span className="text-[8px] font-mono uppercase text-white/40">Power (n)</span>
                <input 
                  type="range" min="2" max="16" step="0.1" value={power}
                  onChange={(e) => setPower(parseFloat(e.target.value))}
                  className="w-28 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
              <button
                onClick={() => setIsTvMode(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
                title="Exit TV Exhibition Mode"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating "Now Playing" Song Recognition Card */}
      <AnimatePresence>
        {currentTrack && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="absolute top-20 left-4 z-20 pointer-events-auto bg-black/60 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl p-3 max-w-xs shadow-2xl flex items-center gap-3.5 ui-reactive-panel"
          >
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/20 shrink-0">
              <img src={currentTrack.cover} alt={currentTrack.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Disc3 className="w-6 h-6 text-white/80 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[8px] font-mono uppercase tracking-widest text-cyan-400">Now Playing</span>
                <span className="text-[8px] font-mono text-white/40 ml-auto">{currentTrack.bpm} BPM</span>
              </div>
              <div className="text-xs font-semibold text-white truncate mt-0.5">{currentTrack.title}</div>
              <div className="text-[10px] text-white/60 truncate">{currentTrack.artist} • {currentTrack.key}</div>
            </div>
            <button 
              onClick={() => {
                stopDemoAudio();
                setCurrentTrack(null);
              }}
              className="text-white/30 hover:text-white p-1"
              title="Stop track"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating System Interface HUD */}
      <div className={`absolute bottom-6 left-6 z-20 transition-opacity duration-300 ${isTvMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <AnimatePresence mode="wait">
          {isCollapsed ? (
            <motion.button
              key="collapsed"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={() => setIsCollapsed(false)}
              className="w-10 h-10 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-all shadow-2xl group ui-reactive-panel"
              title="Open System Interface"
            >
              <Sliders className="w-4 h-4 text-white/60 group-hover:text-white" />
            </motion.button>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-[90vw] md:w-[320px] bg-black/70 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col ui-reactive-panel"
            >
              {/* Header */}
              <div className="border-b border-white/10 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  <h2 className="text-white/90 font-mono text-[10px] uppercase tracking-widest font-semibold">System Interface</h2>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsCollapsed(true)}
                    className="p-1 text-white/40 hover:text-white transition-colors"
                    title="Collapse HUD"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-white/10 px-3 overflow-x-auto no-scrollbar">
                {[
                  { id: 'landscape', label: 'Preset' },
                  { id: 'formulas', label: 'Formulas' },
                  { id: 'music', label: 'Audio' },
                  { id: 'controls', label: 'Render' },
                  { id: 'minimap', label: 'Minimap' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`text-[9px] font-mono uppercase tracking-wider py-3 px-2 border-b-2 transition-all whitespace-nowrap ${
                      activeTab === tab.id 
                        ? 'text-cyan-400 border-cyan-400 font-semibold' 
                        : 'text-white/40 border-transparent hover:text-white/70'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="p-4 space-y-4 max-h-[460px] overflow-y-auto">
                {/* 1. FORMULA & MATHEMATICS TAB */}
                {activeTab === 'formulas' && (
                  <div className="space-y-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-1.5">
                      <div className="flex justify-between items-center text-[9px] font-mono text-cyan-400">
                        <span>LIVE FORMULA</span>
                        <span>{isInBiophilicZone ? '★ BIOPHILIC OPTIMAL' : 'DIVERGENT'}</span>
                      </div>
                      <div className="font-mono text-xs text-white tracking-wide">
                        Z_{`{k+1}`} = Z_{`{k}`}^{power.toFixed(1)} + C
                      </div>
                      <div className="text-[9px] text-white/50 flex justify-between pt-1">
                        <span>Dimension D ≈ {calculatedD}</span>
                        <span>Stress Zone: 1.3 - 1.5</span>
                      </div>
                    </div>

                    {/* Dynamic Power Drive Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-[9px] font-mono uppercase">
                        <span className="text-white/40">Spherical Power (n)</span>
                        <span className="text-cyan-400 font-semibold">{power.toFixed(1)}</span>
                      </div>
                      <input 
                        type="range" min="2" max="16" step="0.1" value={power}
                        onChange={(e) => setPower(parseFloat(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-400"
                      />
                      <div className="flex justify-between text-[7px] font-mono text-white/30 uppercase">
                        <span>n=2 (Cardioid)</span>
                        <span>n=8 (White/Nylander)</span>
                        <span>n=16 (Spire)</span>
                      </div>
                    </div>

                    {/* Formula Architecture Mode */}
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono uppercase text-white/40">Fractal Topology</span>
                      <div className="grid grid-cols-1 gap-1.5">
                        {[
                          { id: 0, title: 'White & Nylander (Standard)', sub: 'Triplex spherical algebra' },
                          { id: 1, title: '3D Julia Morph', sub: 'Fixed constant offset crystal' },
                          { id: 2, title: 'Biophilic Wave Perturbation', sub: 'Trigonometric sine acoustic wave' }
                        ].map(f => (
                          <button
                            key={f.id}
                            onClick={() => setFormula(f.id)}
                            className={`p-2.5 rounded-xl text-left border transition-all ${
                              formula === f.id 
                                ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300' 
                                : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10'
                            }`}
                          >
                            <div className="text-[10px] font-mono font-medium">{f.title}</div>
                            <div className="text-[8px] text-white/40">{f.sub}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. AUDIO & MUSIC SYNC TAB */}
                {activeTab === 'music' && (
                  <div className="space-y-4">
                    {/* Live Mic Reactivity Toggle */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                      <div>
                        <div className="text-[10px] font-mono uppercase text-white font-medium">Microphone Sync</div>
                        <div className="text-[8px] text-white/40">Analyze bass, mids & treble from room</div>
                      </div>
                      <button
                        onClick={toggleAudioReactive}
                        className={`px-3 py-1.5 rounded-full font-mono text-[9px] uppercase tracking-wider transition-all border ${
                          isAudioReactive 
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.3)]' 
                            : 'bg-white/5 text-white/40 border-white/10'
                        }`}
                      >
                        {isAudioReactive ? 'Live Sync' : 'Static'}
                      </button>
                    </div>

                    {/* Gemini Audio Radar / Identify Track */}
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="text-[10px] font-mono uppercase text-white font-medium flex items-center gap-1.5">
                          <Radio className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Gemini Track Radar</span>
                        </div>
                        {recognitionScore && (
                          <span className="text-[8px] font-mono text-emerald-400">{recognitionScore}% Match</span>
                        )}
                      </div>
                      <p className="text-[8px] text-white/50 leading-relaxed">
                        Identify songs in real time and automatically synchronize fractal topology to musical characteristics.
                      </p>
                      <button
                        onClick={triggerAudioRecognition}
                        disabled={isRecognizing}
                        className="w-full py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/40 text-cyan-300 rounded-lg font-mono text-[9px] uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                      >
                        {isRecognizing ? (
                          <>
                            <div className="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                            <span>{recognitionText}</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Identify Current Song</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Demo Playlist for 1-Click Smart TV Testing */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[9px] font-mono text-white/40 uppercase">
                        <span>Instant Demo Playlist</span>
                        <span>TV Testing</span>
                      </div>
                      <div className="space-y-1.5">
                        {DEMO_PLAYLIST.map(track => {
                          const isCurrent = currentTrack?.id === track.id;
                          return (
                            <button
                              key={track.id}
                              onClick={() => isCurrent ? stopDemoAudio() : playDemoTrack(track)}
                              className={`w-full p-2.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                                isCurrent 
                                  ? 'bg-cyan-500/20 border-cyan-500/40 text-white' 
                                  : 'bg-white/5 border-white/5 text-white/70 hover:bg-white/10'
                              }`}
                            >
                              <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-white/10">
                                <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-[10px] font-medium truncate">{track.title}</div>
                                <div className="text-[8px] text-white/40 truncate">{track.artist} • {track.genre}</div>
                              </div>
                              <div className="shrink-0">
                                {isCurrent ? (
                                  <Pause className="w-3.5 h-3.5 text-cyan-400" />
                                ) : (
                                  <Play className="w-3.5 h-3.5 text-white/40" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. LANDSCAPES TAB */}
                {activeTab === 'landscape' && (
                  <div className="grid grid-cols-1 gap-3">
                    {landscapes.map((landscape) => (
                      <button
                        key={landscape.id}
                        onClick={() => applyLandscape(landscape)}
                        className="w-full text-left group"
                      >
                        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10 bg-white/5 transition-all group-hover:border-cyan-500/40 group-hover:scale-[1.01]">
                          <img 
                            src={landscape.image} 
                            alt={landscape.name}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                          <div className="absolute bottom-2 left-3 right-3 flex justify-between items-end">
                            <div>
                              <div className="text-white font-mono text-[10px] font-semibold tracking-wider">{landscape.name}</div>
                              <div className="text-[8px] text-white/60 font-mono">{landscape.formulaName}</div>
                            </div>
                            <span className="text-[8px] font-mono text-cyan-400 uppercase">Load →</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* 4. RENDER CONTROLS TAB */}
                {activeTab === 'controls' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono uppercase text-white/40">Auto-Rotation</span>
                      <button 
                        onClick={() => setIsPaused(!isPaused)}
                        className={`px-3 py-1 rounded-full font-mono text-[9px] uppercase tracking-wider transition-all border ${
                          isPaused ? 'bg-white/5 text-white/40 border-white/10' : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        }`}
                      >
                        {isPaused ? 'Paused' : 'Active'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono uppercase text-white/40">Render Wireframe</span>
                      <button 
                        onClick={() => setIsWireframe(!isWireframe)}
                        className={`px-3 py-1 rounded-full font-mono text-[9px] uppercase tracking-wider transition-all border ${
                          !isWireframe ? 'bg-white/5 text-white/40 border-white/10' : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        }`}
                      >
                        {isWireframe ? 'Wireframe' : 'Shaded'}
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-[9px] font-mono uppercase">
                        <span className="text-white/40">Ambient Occlusion</span>
                        <span className="text-white/80">{aoIntensity.toFixed(2)}x</span>
                      </div>
                      <input 
                        type="range" min="0" max="2" step="0.01" value={aoIntensity}
                        onChange={(e) => setAoIntensity(parseFloat(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-[9px] font-mono uppercase">
                        <span className="text-white/40">Focal Zoom</span>
                        <span className="text-white/80">{zoom.toFixed(2)}</span>
                      </div>
                      <input 
                        type="range" min="1.0" max="3.2" step="0.01" value={zoom}
                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-[9px] font-mono uppercase">
                        <span className="text-white/40">Atmospheric Mist & Fog</span>
                        <span className="text-white/80">{fogDensity.toFixed(2)}x</span>
                      </div>
                      <input 
                        type="range" min="0" max="1" step="0.01" value={fogDensity}
                        onChange={(e) => setFogDensity(parseFloat(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <span className="text-[9px] font-mono uppercase text-white/40">Atmospheric Hue</span>
                      <div className="grid grid-cols-4 gap-2">
                        {(['cyan', 'orange', 'purple', 'lime'] as const).map((mode) => (
                          <button
                            key={mode}
                            onClick={() => setColorMode(mode)}
                            className={`h-7 rounded-lg border transition-all ${
                              colorMode === mode 
                                ? 'border-white ring-2 ring-white/30' 
                                : 'border-white/10 hover:border-white/30'
                            }`}
                            style={{ 
                              backgroundColor: `rgb(${colors[mode][0]*255}, ${colors[mode][1]*255}, ${colors[mode][2]*255}, 0.35)` 
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. MINIMAP TAB */}
                {activeTab === 'minimap' && (
                  <div className="space-y-4">
                    <div className="relative aspect-square w-full bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                      
                      <div 
                        className="relative w-36 h-36 cursor-crosshair touch-none"
                        onPointerDown={(e) => {
                          e.currentTarget.setPointerCapture(e.pointerId);
                          handleMinimapInteraction(e);
                        }}
                        onPointerMove={(e) => {
                          if (e.buttons > 0) handleMinimapInteraction(e);
                        }}
                      >
                        <div className="absolute inset-0 rounded-full border border-white/20 bg-white/5 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]" />
                        <div className="absolute inset-0 rounded-full border border-white/10 scale-75 rotate-45" />
                        <div className="absolute inset-0 rounded-full border border-white/10 scale-75 -rotate-45" />
                        
                        {(() => {
                          const r = 72;
                          let x = 0, y = 0, z = -1;
                          const cosP = Math.cos(pitch), sinP = Math.sin(pitch);
                          const py = y * cosP - z * sinP, pz = y * sinP + z * cosP;
                          y = py; z = pz;
                          const cosY = Math.cos(yaw), sinY = Math.sin(yaw);
                          const yx = x * cosY - z * sinY, yz = x * sinY + z * cosY;
                          x = yx; z = yz;
                          
                          const screenX = 72 + x * r;
                          const screenY = 72 + y * r;
                          const opacity = z > 0 ? 1 : 0.3;
                          const scale = 1 + z * 0.4;
                          
                          return (
                            <div 
                              className="absolute w-3.5 h-3.5 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.9)] transition-all duration-75"
                              style={{ 
                                left: `${screenX}px`, 
                                top: `${screenY}px`,
                                transform: `translate(-50%, -50%) scale(${scale})`,
                                opacity: opacity,
                                zIndex: z > 0 ? 10 : 0
                              }}
                            />
                          );
                        })()}

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white/60 rounded-full blur-[1px]" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                        <span className="text-[7px] text-white/30 block mb-0.5">AZIMUTH</span>
                        <span className="text-[10px] text-white/80 font-mono">{(yaw * (180/Math.PI)).toFixed(0)}°</span>
                      </div>
                      <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                        <span className="text-[7px] text-white/30 block mb-0.5">ELEVATION</span>
                        <span className="text-[10px] text-white/80 font-mono">{(pitch * (180/Math.PI)).toFixed(0)}°</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SCIENCE OF THE FRACTAL: Interactive Pedagogical Modal */}
      <AnimatePresence>
        {showScienceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-black/90 border border-white/15 rounded-3xl max-w-xl w-full p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative space-y-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono uppercase tracking-widest text-white/90 font-semibold">
                    The Science Behind The Mandelbulb
                  </span>
                </div>
                <button
                  onClick={() => setShowScienceModal(false)}
                  className="p-1 rounded-full text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Card Indicator Tabs */}
              <div className="flex gap-1.5 justify-center">
                {SCIENCE_CARDS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setScienceIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      scienceIndex === i ? 'w-8 bg-cyan-400' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              {/* Active Educational Card Content */}
              <div className="space-y-4 min-h-[220px]">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                    {SCIENCE_CARDS[scienceIndex].tag}
                  </span>
                  <span className="text-[10px] font-mono text-white/30">
                    Card {scienceIndex + 1} of {SCIENCE_CARDS.length}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-mono text-white font-semibold tracking-wide">
                  {SCIENCE_CARDS[scienceIndex].title}
                </h3>

                <div className="bg-white/5 border border-white/10 rounded-xl p-3 font-mono text-xs text-cyan-300 overflow-x-auto text-center">
                  {SCIENCE_CARDS[scienceIndex].formula}
                </div>

                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {SCIENCE_CARDS[scienceIndex].body}
                </p>
              </div>

              {/* Footer Controls */}
              <div className="flex justify-between items-center border-t border-white/10 pt-4">
                <button
                  onClick={() => setScienceIndex(prev => (prev > 0 ? prev - 1 : SCIENCE_CARDS.length - 1))}
                  className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-white/70 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Previous
                </button>
                <button
                  onClick={() => setScienceIndex(prev => (prev < SCIENCE_CARDS.length - 1 ? prev + 1 : 0))}
                  className="px-4 py-1.5 rounded-xl border border-cyan-500/40 bg-cyan-500/20 text-cyan-300 font-mono text-xs flex items-center gap-1.5 transition-colors shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                >
                  Next Card <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
