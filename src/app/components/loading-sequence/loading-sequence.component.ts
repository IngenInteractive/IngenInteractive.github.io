import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

interface LoadingStep {
  label: string;
  duration: number;
}

@Component({
  selector: 'app-loading-sequence',
  standalone: true,
  templateUrl: './loading-sequence.component.html',
  styleUrl: './loading-sequence.component.scss'
})
export class LoadingSequenceComponent implements OnInit, OnDestroy {
  @Output() complete = new EventEmitter<void>();

  readonly steps: LoadingStep[] = [
    { label: 'ACCESSING PRIZE DATABASE...', duration: 950 },
    { label: 'VERIFYING WINNING ENTRY...', duration: 1050 },
    { label: 'RETRIEVING PRIZE INFORMATION...', duration: 1150 },
    { label: 'CHECKING AUTHORIZATION PHRASE...', duration: 1400 }
  ];

  activeStep = 0;
  progress = 0;
  private timers: number[] = [];

  ngOnInit(): void {
    this.runStep();
  }

  ngOnDestroy(): void {
    this.timers.forEach((timer) => window.clearTimeout(timer));
  }

  private runStep(): void {
    if (this.activeStep >= this.steps.length) {
      this.timers.push(window.setTimeout(() => this.complete.emit(), 750));
      return;
    }

    this.progress = 0;
    const duration = this.steps[this.activeStep].duration;
    const interval = 80;
    let elapsed = 0;

    const tick = (): void => {
      elapsed += interval;
      this.progress = Math.min(100, Math.round((elapsed / duration) * 100));

      if (elapsed < duration) {
        this.timers.push(window.setTimeout(tick, interval));
        return;
      }

      this.activeStep += 1;
      this.timers.push(window.setTimeout(() => this.runStep(), 240));
    };

    this.timers.push(window.setTimeout(tick, interval));
  }
}
