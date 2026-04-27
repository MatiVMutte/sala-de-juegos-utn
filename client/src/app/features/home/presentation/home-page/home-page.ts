import { Component } from '@angular/core';
import { NavBar } from '../../../../shared/nav-bar/nav-bar';
import { GameCard } from '../../../../shared/game-card/game-card';
import { Footer } from '../../../../shared/footer/footer';
import { GAMES_DATA } from '../../../games/shared/games.data';

@Component({
  selector: 'app-home-page',
  imports: [NavBar, GameCard, Footer],
  templateUrl: './home-page.html',
})
export class HomePage {
  public title: string = 'BIENVENIDO';
  public subtitle: string = 'Un viaje al interior de tu mente';
  public description: string = 'El objetivo del proyecto es proporcionar una plataforma donde los usuarios puedan medir sus capacidades cognitivas y motrices a través de una interfaz intuitiva que registre estadísticas detalladas de cada sesión.';
  
  public games = GAMES_DATA;
}
