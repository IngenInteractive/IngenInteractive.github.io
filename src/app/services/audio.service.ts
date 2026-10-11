import { Injectable } from '@angular/core';
import { MAGIC_WORD_AUDIO } from './media-config';

@Injectable({ providedIn: 'root' })
export class AudioService {
  private audio?: HTMLAudioElement;
  private primed = false;

  primeMagicWord(): void {
    const audio = this.getAudio();

    if (this.primed) {
      audio.load();
      return;
    }

    audio.muted = true;
    void audio.play().then(() => {
      audio.pause();
      audio.currentTime = 0;
      audio.muted = false;
      this.primed = true;
    }).catch(() => {
      audio.muted = false;
      audio.load();
    });
  }

  playMagicWord(): void {
    const audio = this.getAudio();
    audio.muted = false;
    audio.currentTime = 0;
    void audio.play().catch(() => {
      // Missing files or autoplay restrictions should never interrupt the prank flow.
    });
  }

  private getAudio(): HTMLAudioElement {
    if (!this.audio) {
      this.audio = new Audio(MAGIC_WORD_AUDIO);
      this.audio.preload = 'auto';
      this.audio.loop = true;
    }

    return this.audio;
  }
}
