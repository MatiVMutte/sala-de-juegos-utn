import { Component, Input } from '@angular/core';

export interface GameCardData {
  title: string;
  description: string;
}

@Component({
  selector: 'app-game-card',
  imports: [],
  templateUrl: './game-card.html',
})
export class GameCard {
  @Input() game!: GameCardData;
}
