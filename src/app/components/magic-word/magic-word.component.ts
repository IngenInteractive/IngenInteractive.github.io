import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { MAGIC_WORD_VIDEO } from '../../services/media-config';

@Component({
  selector: 'app-magic-word',
  standalone: true,
  templateUrl: './magic-word.component.html',
  styleUrl: './magic-word.component.scss'
})
export class MagicWordComponent implements OnInit, AfterViewInit {
  @ViewChild('magicVideo') private magicVideo?: ElementRef<HTMLVideoElement>;

  readonly videoSource = MAGIC_WORD_VIDEO;
  hasVideo = false;
  videoChecked = false;
  screamLetters = Array.from({ length: 26 }, (_, index) => index);
  private readonly audioService = inject(AudioService);

  ngOnInit(): void {
    this.audioService.playMagicWord();
  }

  ngAfterViewInit(): void {
    const video = this.magicVideo?.nativeElement;
    video?.load();
  }

  onVideoReady(): void {
    this.hasVideo = true;
    this.videoChecked = true;
    const video = this.magicVideo?.nativeElement;
    if (video) {
      void video.play().catch(() => undefined);
    }
  }

  onVideoError(): void {
    this.hasVideo = false;
    this.videoChecked = true;
  }
}
