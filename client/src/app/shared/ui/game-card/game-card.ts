import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameCardData } from '../../../features/games/domain/game.model';

@Component({
  selector: 'app-game-card',
  imports: [RouterLink],
  templateUrl: './game-card.html',
})
export class GameCard {
  @Input() game!: GameCardData;
}
