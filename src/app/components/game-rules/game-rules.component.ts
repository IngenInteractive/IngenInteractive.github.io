import { Component } from '@angular/core';

@Component({
  selector: 'app-game-rules',
  standalone: true,
  templateUrl: './game-rules.component.html',
  styleUrl: './game-rules.component.scss'
})
export class GameRulesComponent {
  readonly rules = [
    'Each visitor may play once.',
    'Scratch the designated area completely enough to reveal the result.',
    'Prizes are subject to availability.',
    'Prizes cannot be exchanged for cash.',
    'The park reserves the right to modify prizes without notice.',
    'In the event of a system malfunction, please remain calm.',
    'All decisions made by park computer systems are final.',
    'Do not attempt to access restricted areas.'
  ];
}
