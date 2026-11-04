// Ambient Indian Classical Sitar & Tanpura Sound Engine
// Uses Web Audio API for 100% offline-reliable, ethereal royal palace ambiance

class IndianAmbienceEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.intervalId = null;
    this.volume = 0.35;
    this.onStateChangeCallbacks = [];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  // Pentatonic Raag Bhupali / Yaman note frequencies (Sa, Re, Ga, Pa, Dha)
  // C4 = 261.63, D4 = 293.66, E4 = 329.63, G4 = 392.00, A4 = 440.00, C5 = 523.25, D5 = 587.33
  playSitarNote(freq, time, duration = 3.2) {
    if (!this.ctx || !this.isPlaying) return;

    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Sitar has rich bright harmonics and metallic pluck
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 1.002, time); // Subtle detune for shimmer

    // Gentle low-pass filter to sound warm and acoustic like an acoustic sitar / flute
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, time);
    filter.frequency.exponentialRampToValueAtTime(450, time + duration);

    // Pluck envelope: quick rise, resonant acoustic decay
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(0.22, time + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc2.start(time);
    osc.stop(time + duration);
    osc2.stop(time + duration);
  }

  // Tanpura continuous meditative drone
  startTanpuraDrone() {
    if (!this.ctx) return;

    // Sa (C3 = 130.81Hz), Pa (G2 = 98.00Hz), Sa high (C4 = 261.63Hz)
    const droneFreqs = [130.81, 196.00, 261.63, 65.4];

    droneFreqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);

      const baseGain = idx === 3 ? 0.04 : 0.025;
      gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(baseGain, this.ctx.currentTime + 2.0);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      this.droneOscs = this.droneOscs || [];
      this.droneOscs.push({ osc, gain });
    });
  }

  stopTanpuraDrone() {
    if (this.droneOscs) {
      this.droneOscs.forEach(({ osc, gain }) => {
        try {
          if (this.ctx) {
            gain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
            setTimeout(() => {
              try { osc.stop(); } catch (e) {}
            }, 900);
          }
        } catch (e) {}
      });
      this.droneOscs = [];
    }
  }

  startMelodyLoop() {
    // Ethereal Indian raag phrases
    const raagNotes = [
      261.63, // C4 (Sa)
      293.66, // D4 (Re)
      329.63, // E4 (Ga)
      392.00, // G4 (Pa)
      440.00, // A4 (Dha)
      523.25, // C5 (Sa')
      587.33, // D5 (Re')
    ];

    // Phrases that evoke classic royal Indian wedding melodies
    const phrases = [
      [0, 1, 2, 3],
      [2, 3, 4, 3, 2],
      [4, 3, 4, 5],
      [5, 4, 3, 2, 0],
      [0, 2, 3, 2, 1, 0],
      [3, 4, 5, 6, 5]
    ];

    let phraseIndex = 0;

    const playNextPhrase = () => {
      if (!this.isPlaying || !this.ctx) return;

      const phrase = phrases[phraseIndex % phrases.length];
      phraseIndex++;

      const now = this.ctx.currentTime;
      phrase.forEach((noteIdx, i) => {
        const noteFreq = raagNotes[noteIdx];
        const delay = i * 0.75 + (Math.random() * 0.15);
        this.playSitarNote(noteFreq, now + delay, 2.5 + Math.random() * 0.8);
      });

      // Next phrase timing
      const nextDelay = (phrase.length * 750) + 2400 + Math.random() * 1200;
      this.intervalId = setTimeout(playNextPhrase, nextDelay);
    };

    playNextPhrase();
  }

  async start() {
    this.init();
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
    this.isPlaying = true;
    this.startTanpuraDrone();
    this.startMelodyLoop();
    this.notifyState();
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
    this.stopTanpuraDrone();
    this.notifyState();
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  subscribe(callback) {
    this.onStateChangeCallbacks.push(callback);
    return () => {
      this.onStateChangeCallbacks = this.onStateChangeCallbacks.filter(cb => cb !== callback);
    };
  }

  notifyState() {
    this.onStateChangeCallbacks.forEach(cb => cb(this.isPlaying));
  }
}

export const soundEngine = new IndianAmbienceEngine();

