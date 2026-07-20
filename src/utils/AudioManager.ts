/**
 * ===================================================
 * AudioManager.ts — Sistema audio per il videogioco
 * ===================================================
 * Gestisce:
 * - BGM (BackGround Music) usando HTML5 Audio
 * - SFX (Sound Effects) sintetizzati con Web Audio API 
 *   per garantire che ci siano sempre senza caricare file.
 */

class AudioManager {
  private static ctx: AudioContext | null = null;
  private static bgmAudio: HTMLAudioElement | null = null;
  public static isMuted: boolean = false;
  public static bgmVolume: number = 0.5; // Default music volume (0.0 to 1.0)
  public static sfxVolume: number = 0.5; // Default effects volume (0.0 to 1.0)

  /** Inizializza il contesto audio (richiede iterazione dell'utente prima) */
  public static initCtx() {
    if (!this.ctx) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * =========================================
   * MUSICA DI SOTTOFONDO (BGM)
   * =========================================
   */
  public static playBGM(url: string = 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3') {
    if (this.isMuted) {
      this.stopBGM();
      return;
    }
    
    if (!this.bgmAudio) {
      this.bgmAudio = new Audio(url);
      this.bgmAudio.loop = true;
      this.bgmAudio.volume = 0.3 * this.bgmVolume;
    } else if (this.bgmAudio.src !== url) {
      this.bgmAudio.src = url;
    }
    
    // Update volume in case it changed while stopped
    this.bgmAudio.volume = 0.3 * this.bgmVolume;
    
    // I browser moderni bloccano l'autoplay se non c'è stata interazione
    const playPromise = this.bgmAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(e => {
        console.warn("BGM play prevented by browser policy. Will try again on next interaction.", e);
      });
    }
  }

  public static stopBGM() {
    if (this.bgmAudio) {
      this.bgmAudio.pause();
    }
  }

  public static setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopBGM();
    } else {
      // Se viene smutato, proviamo a far ripartire una musica di default se non c'è
      if (this.bgmAudio) {
        this.bgmAudio.play().catch(e => console.warn(e));
      }
    }
  }

  public static setBgmVolume(vol: number) {
    this.bgmVolume = Math.max(0, Math.min(1, vol));
    if (this.bgmAudio) {
      this.bgmAudio.volume = 0.3 * this.bgmVolume;
    }
  }

  public static setSfxVolume(vol: number) {
    this.sfxVolume = Math.max(0, Math.min(1, vol));
  }

  /**
   * =========================================
   * EFFETTI SONORI SINTETIZZATI (SFX)
   * =========================================
   */
  private static playSynth(freq: number, type: OscillatorType, durationMs: number, baseVol = 0.1) {
    if (this.isMuted || this.sfxVolume === 0) return;
    this.initCtx();
    if (!this.ctx) return;

    const finalVol = baseVol * this.sfxVolume * 2; // Scala col volume effetti

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gainNode.gain.setValueAtTime(finalVol, this.ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + durationMs / 1000);

    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + durationMs / 1000);
  }

  /** Suono "Typewriter" quando appare il testo */
  public static playBlip() {
    // Frequenza leggermente randomica per un effetto più naturale
    this.playSynth(600 + Math.random() * 200, 'sine', 40, 0.02);
  }

  /** Suono UI generico al passaggio/click */
  public static playHover() {
    this.playSynth(300, 'triangle', 30, 0.01);
  }

  public static playClick() {
    this.playSynth(450, 'square', 60, 0.03);
  }

  /** Suono di feedback Positivo (Scelta Assertiva) */
  public static playSuccess() {
    if (this.isMuted) return;
    this.initCtx();
    
    // Arpeggio felice
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      setTimeout(() => this.playSynth(freq, 'sine', 400, 0.08), i * 80);
    });
  }

  /** Suono di feedback Negativo (Scelta Impulsiva) */
  public static playError() {
    if (this.isMuted) return;
    this.initCtx();
    
    // Suono basso e graffiante
    this.playSynth(150, 'sawtooth', 400, 0.1);
    setTimeout(() => this.playSynth(130, 'sawtooth', 500, 0.1), 150);
  }

  /** Suono Neutro (Scelta Passiva) */
  public static playNeutral() {
    if (this.isMuted) return;
    this.initCtx();
    
    this.playSynth(300, 'sine', 300, 0.05);
    setTimeout(() => this.playSynth(250, 'sine', 400, 0.05), 200);
  }
}

export default AudioManager;
