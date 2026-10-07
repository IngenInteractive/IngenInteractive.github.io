import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-prize-reveal',
  standalone: true,
  templateUrl: './prize-reveal.component.html',
  styleUrl: './prize-reveal.component.scss'
})
export class PrizeRevealComponent {
  @Output() revealPrize = new EventEmitter<void>();
}
