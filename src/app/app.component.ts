import { Component } from '@angular/core';
import { GameRulesComponent } from './components/game-rules/game-rules.component';
import { LoadingSequenceComponent } from './components/loading-sequence/loading-sequence.component';
import { MagicWordComponent } from './components/magic-word/magic-word.component';
import { PrizeListComponent } from './components/prize-list/prize-list.component';
import { PrizeRevealComponent } from './components/prize-reveal/prize-reveal.component';
import { ScratchCardComponent } from './components/scratch-card/scratch-card.component';

export type GameState = 'scratch' | 'won' | 'loading' | 'magic-word';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    GameRulesComponent,
    LoadingSequenceComponent,
    MagicWordComponent,
    PrizeListComponent,
    PrizeRevealComponent,
    ScratchCardComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  gameState: GameState = 'scratch';

  onScratchComplete(): void {
    this.gameState = 'won';
  }

  revealPrize(): void {
    this.gameState = 'loading';
  }

  triggerMagicWord(): void {
    this.gameState = 'magic-word';
  }
}
