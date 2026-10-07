import { Injectable } from '@angular/core';
import { MAGIC_WORD_AUDIO } from './media-config';

@Injectable({ providedIn: 'root' })
export class AudioService {
  private audio?: HTMLAudioElement;

  playMagicWord(): void {
    if (!this.audio) {
      this.audio = new Audio(MAGIC_WORD_AUDIO);
      this.audio.preload = 'auto';
    }

    this.audio.currentTime = 0;
    void this.audio.play().catch(() => {
      // Missing files or autoplay restrictions should never interrupt the prank flow.
    });
  }
}
