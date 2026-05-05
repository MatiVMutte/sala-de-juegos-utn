import { Component, Input } from '@angular/core';
import { GameCard, GameCardData } from '../game-card/game-card';

@Component({
  selector: 'app-games-grid',
  imports: [GameCard],
  templateUrl: './games-grid.html',
})
export class GamesGrid {
  @Input() games: GameCardData[] = [];
  @Input() loginPrompt: string = '';
}
