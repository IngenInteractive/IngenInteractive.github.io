import { Component, inject } from '@angular/core';
import { GameRulesComponent } from './components/game-rules/game-rules.component';
import { LoadingSequenceComponent } from './components/loading-sequence/loading-sequence.component';
import { MagicWordComponent } from './components/magic-word/magic-word.component';
import { PrizeListComponent } from './components/prize-list/prize-list.component';
import { PrizeRevealComponent } from './components/prize-reveal/prize-reveal.component';
import { ScratchCardComponent } from './components/scratch-card/scratch-card.component';
import { AudioService } from './services/audio.service';

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
  private readonly audioService = inject(AudioService);

  onScratchComplete(): void {
    this.gameState = 'won';
  }

  revealPrize(): void {
    this.audioService.primeMagicWord();
    this.gameState = 'loading';
  }

  triggerMagicWord(): void {
    this.gameState = 'magic-word';
  }
}
