import { Component } from '@angular/core';
import { NavBar } from '../../../../shared/nav-bar/nav-bar';
import { Footer } from '../../../../shared/footer/footer';
import { GameCard } from '../../../../shared/game-card/game-card';
import { GAMES_DATA } from '../../../games/shared/games.data';

@Component({
  selector: 'app-games-list-page',
  imports: [NavBar, Footer, GameCard],
  templateUrl: './games-list-page.html',
})
export class GamesListPage {
  public title: string = 'JUEGOS';
  public subtitle: string = 'Elige tu desafío';
  public description: string = 'Todos los juegos requieren inicio de sesión para registrar tus estadísticas y comparar tus tiempos con otros jugadores.';
  
  public games = GAMES_DATA;
}
