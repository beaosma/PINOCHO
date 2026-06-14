/**
 * Web Audio API synthesizer for the Escape Room.
 * Generates custom synthesized sounds without requiring external MP3 assets.
 */

class SoundEffects {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Sound of wood blocks for the tick-tock timer.
   */
  public playTick(isTock: boolean = false) {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(isTock ? 600 : 850, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {
      // Audio context might be restricted before user gesture
    }
  }

  /**
   * Sparkling magical sound when the Blue Fairy helps.
   */
  public playMagic() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // Arpeggio C Major

      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.1 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.35);

        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.4);
      });
    } catch (e) { }
  }

  /**
   * Correct answer ding.
   */
  public playCorrect() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.setValueAtTime(659.25, now + 0.12); // E5

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1046.50, now); // C6

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc1.start(now);
      osc1.stop(now + 0.5);
      osc2.start(now);
      osc2.stop(now + 0.5);
    } catch (e) { }
  }

  /**
   * Error buzzer.
   */
  public playError() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.3);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) { }
  }

  /**
   * Grand magical fanfare for the final transformation of Pinocho.
   */
  public playFanfare() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const chord = [261.63, 329.63, 392.00, 523.25]; // C major chord

      chord.forEach((freq) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 2, now + 1.2);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

        osc.start(now);
        osc.stop(now + 1.5);
      });
    } catch (e) { }
  }
}

export const soundEffects = new SoundEffects();
