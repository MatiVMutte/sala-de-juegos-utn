import { Component, Input } from '@angular/core';
import { GameCard } from '../game-card/game-card';
import { GameCardData } from '../../../features/games/domain/game.model';

@Component({
  selector: 'app-games-grid',
  imports: [GameCard],
  templateUrl: './games-grid.html',
})
export class GamesGrid {
  @Input() games: GameCardData[] = [];
  @Input() loginPrompt: string = '';
}
