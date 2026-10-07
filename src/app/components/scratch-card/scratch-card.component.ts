import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-scratch-card',
  standalone: true,
  templateUrl: './scratch-card.component.html',
  styleUrl: './scratch-card.component.scss'
})
export class ScratchCardComponent implements AfterViewInit, OnChanges {
  @Input() completed = false;
  @Output() scratchComplete = new EventEmitter<void>();
  @ViewChild('scratchCanvas') private canvasRef?: ElementRef<HTMLCanvasElement>;

  private context?: CanvasRenderingContext2D;
  private scratching = false;
  private hasEmitted = false;
  private readonly revealThreshold = 0.5;
  private readonly brushRadius = 22;

  ngAfterViewInit(): void {
    this.prepareCanvas();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['completed']?.currentValue) {
      this.revealAll();
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (!this.completed) {
      this.prepareCanvas();
    }
  }

  beginScratch(event: PointerEvent): void {
    if (this.completed) {
      return;
    }

    this.scratching = true;
    this.scratch(event);
  }

  scratch(event: PointerEvent): void {
    if (!this.scratching || this.completed || !this.context || !this.canvasRef) {
      return;
    }

    event.preventDefault();
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    this.context.globalCompositeOperation = 'destination-out';
    this.context.beginPath();
    this.context.arc(x, y, this.brushRadius * scaleX, 0, Math.PI * 2);
    this.context.fill();

    if (this.calculateRevealedRatio() >= this.revealThreshold) {
      this.completeCard();
    }
  }

  endScratch(): void {
    this.scratching = false;
  }

  keyboardReveal(): void {
    if (!this.completed) {
      this.completeCard();
    }
  }

  private prepareCanvas(): void {
    if (!this.canvasRef) {
      return;
    }

    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.round(rect.width * pixelRatio));
    canvas.height = Math.max(1, Math.round(rect.height * pixelRatio));
    this.context = canvas.getContext('2d') ?? undefined;

    if (!this.context) {
      return;
    }

    this.drawCoating(canvas.width, canvas.height);
  }

  private drawCoating(width: number, height: number): void {
    if (!this.context) {
      return;
    }

    const gradient = this.context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#d8d8d8');
    gradient.addColorStop(0.48, '#8f9491');
    gradient.addColorStop(1, '#ededed');

    this.context.globalCompositeOperation = 'source-over';
    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, width, height);

    this.context.fillStyle = 'rgba(38, 38, 38, 0.2)';
    for (let i = 0; i < width * height / 260; i += 1) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      this.context.fillRect(x, y, Math.random() * 3 + 1, 1);
    }

    this.context.fillStyle = 'rgba(255, 255, 255, 0.28)';
    this.context.font = `${Math.max(18, width / 18)}px "Courier New", monospace`;
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillText('SCRATCH HERE', width / 2, height / 2);
  }

  private calculateRevealedRatio(): number {
    if (!this.context || !this.canvasRef) {
      return 0;
    }

    const { width, height } = this.canvasRef.nativeElement;
    const sample = this.context.getImageData(0, 0, width, height).data;
    let clearPixels = 0;

    for (let index = 3; index < sample.length; index += 16) {
      if (sample[index] < 30) {
        clearPixels += 1;
      }
    }

    return clearPixels / (sample.length / 16);
  }

  private completeCard(): void {
    this.revealAll();

    if (!this.hasEmitted) {
      this.hasEmitted = true;
      this.scratchComplete.emit();
    }
  }

  private revealAll(): void {
    this.completed = true;
    this.scratching = false;
    this.context?.clearRect(0, 0, this.canvasRef?.nativeElement.width ?? 0, this.canvasRef?.nativeElement.height ?? 0);
  }
}
