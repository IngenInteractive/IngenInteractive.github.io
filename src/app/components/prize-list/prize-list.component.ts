import { Component } from '@angular/core';

@Component({
  selector: 'app-prize-list',
  standalone: true,
  templateUrl: './prize-list.component.html',
  styleUrl: './prize-list.component.scss'
})
export class PrizeListComponent {
  readonly prizes = ['FREE DRINK', 'MYSTERY SNACK', 'DINOSAUR ENCOUNTER', 'VIP PASS', 'MYSTERY PRIZE'];
}
