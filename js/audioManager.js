/**
 * Online Open-Source Audio Stream & Web Audio API Visualizer Engine (Pure Vanilla JS)
 * Streams high-fidelity open-source cyber ambient audio track with Web Audio API fallback.
 */

class AudioManager {
  constructor() {
    this.audioElement = null;
    this.audioCtx = null;
    this.sourceNode = null;
    this.analyser = null;
    this.dataArray = null;
    this.masterGain = null;

    // Web Audio Synthesizer Fallback Nodes
    this.synthOsc1 = null;
    this.synthLfo = null;

    this.canvas = null;
    this.ctx = null;

    this.isPlaying = false;
    this.isMuted = false;
    this.isUsingSynthFallback = false;

    // Online Royalty-Free Open-Source Ambient Audio URLs
    this.audioTracks = [
      'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
      'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3'
    ];
    this.currentTrackIndex = 0;
  }

  init(canvasId = 'audio-visualizer-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
    }

    this.setupAudioElement();
    this.bindControls();
  }

  setupAudioElement() {
    this.audioElement = new Audio();
    this.audioElement.crossOrigin = 'anonymous';
    this.audioElement.loop = true;
    this.audioElement.volume = 0.2;
    this.audioElement.src = this.audioTracks[this.currentTrackIndex];

    this.audioElement.addEventListener('error', () => {
      console.warn('Online audio stream restricted/unavailable, falling back to Web Audio Synthesizer.');
      this.isUsingSynthFallback = true;
      if (this.isPlaying && !this.synthOsc1) {
        this.setupSynthFallback();
      }
    });
  }

  bindControls() {
    const toggleBtn = document.getElementById('audio-toggle-btn');
    const muteBtn = document.getElementById('audio-mute-btn');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggleAudio());
    }

    if (muteBtn) {
      muteBtn.addEventListener('click', () => this.toggleMute());
    }

    // Global Key Shortcut 'M' for Mute/Unmute
    window.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'm' && !['input', 'textarea'].includes((e.target.tagName || '').toLowerCase())) {
        this.toggleMute();
      }
    });

    // Auto-enable audio context on first user interaction anywhere
    const userInteractionHandler = () => {
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
    };
    window.addEventListener('click', userInteractionHandler, { once: true });
    window.addEventListener('keydown', userInteractionHandler, { once: true });
  }

  setupWebAudioContext() {
    if (this.audioCtx) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    this.audioCtx = new AudioContextClass();
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 64;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

    this.masterGain = this.audioCtx.createGain();
    this.masterGain.gain.value = this.isMuted ? 0 : 0.2;

    try {
      if (this.audioElement && !this.sourceNode) {
        this.sourceNode = this.audioCtx.createMediaElementSource(this.audioElement);
        this.sourceNode.connect(this.masterGain);
      }
    } catch (e) {
      console.warn('CORS / MediaElementSource failed, activating Web Audio Synthesizer.', e);
      this.isUsingSynthFallback = true;
    }

    if (this.isUsingSynthFallback) {
      this.setupSynthFallback();
    } else {
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.audioCtx.destination);
    }
  }

  setupSynthFallback() {
    if (!this.audioCtx || this.synthOsc1) return;

    this.synthOsc1 = this.audioCtx.createOscillator();
    this.synthOsc1.type = 'sawtooth';
    this.synthOsc1.frequency.value = 55; // Deep A1 cyber drone

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 450;

    this.synthLfo = this.audioCtx.createOscillator();
    this.synthLfo.frequency.value = 0.2;
    const lfoGain = this.audioCtx.createGain();
    lfoGain.gain.value = 180;

    this.synthLfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    this.synthOsc1.connect(filter);
    filter.connect(this.masterGain);

    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);

    this.synthOsc1.start();
    this.synthLfo.start();
  }

  toggleAudio() {
    this.setupWebAudioContext();

    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) {
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      if (!this.isUsingSynthFallback && this.audioElement) {
        this.audioElement.play().catch((err) => {
          console.warn('Autoplay prevented, switching to Web Audio synth fallback', err);
          this.isUsingSynthFallback = true;
          this.setupSynthFallback();
        });
      }

      if (this.masterGain && this.audioCtx) {
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.2, this.audioCtx.currentTime);
      }

      this.startVisualizer();
    } else {
      if (this.audioElement) {
        this.audioElement.pause();
      }
      if (this.masterGain && this.audioCtx) {
        this.masterGain.gain.setValueAtTime(0, this.audioCtx.currentTime);
      }
      if (this.audioCtx && this.audioCtx.state === 'running') {
        this.audioCtx.suspend();
      }
    }

    this.updateUIState();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;

    if (this.audioElement) {
      this.audioElement.muted = this.isMuted;
    }

    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(
        this.isPlaying && !this.isMuted ? 0.2 : 0,
        this.audioCtx.currentTime
      );
    }

    const muteBtn = document.getElementById('audio-mute-btn');
    if (muteBtn) {
      muteBtn.innerText = this.isMuted ? '🔇' : '🔊';
    }
  }

  updateUIState() {
    const iconSpan = document.getElementById('audio-state-icon');
    if (iconSpan) {
      iconSpan.innerText = this.isPlaying ? '❚❚' : '▶';
    }
    const toggleBtn = document.getElementById('audio-toggle-btn');
    if (toggleBtn) {
      if (this.isPlaying) {
        toggleBtn.classList.add('text-[#00E5FF]');
      } else {
        toggleBtn.classList.remove('text-[#00E5FF]');
      }
    }
  }

  startVisualizer() {
    if (!this.canvas || !this.ctx) return;

    const render = () => {
      if (!this.isPlaying) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        return;
      }

      requestAnimationFrame(render);

      if (this.analyser && this.dataArray) {
        this.analyser.getByteFrequencyData(this.dataArray);
      }

      const w = this.canvas.width;
      const h = this.canvas.height;
      this.ctx.clearRect(0, 0, w, h);

      const barCount = this.dataArray ? 12 : 12;
      const barWidth = (w / barCount) - 1;
      let x = 0;

      for (let i = 0; i < barCount; i++) {
        const val = this.dataArray ? this.dataArray[i * 2] : Math.random() * 120;
        const barHeight = Math.max(2, (val / 255) * h);

        this.ctx.fillStyle = i % 2 === 0 ? '#00E5FF' : '#7C3AED';
        this.ctx.fillRect(x, h - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    render();
  }
}

window.audioManager = new AudioManager();
