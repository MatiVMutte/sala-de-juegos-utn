import { Component, Input } from '@angular/core';
import { GameCardData } from '../../../features/games/domain/game.model';

@Component({
  selector: 'app-game-card',
  imports: [],
  templateUrl: './game-card.html',
})
export class GameCard {
  @Input() game!: GameCardData;
}
