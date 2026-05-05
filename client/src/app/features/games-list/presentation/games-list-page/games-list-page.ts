import { Component } from '@angular/core';
import { PageWrapper } from '../../../../shared/page-wrapper/page-wrapper';
import { PageHeader } from '../../../../shared/page-header/page-header';
import { GamesGrid } from '../../../../shared/games-grid/games-grid';
import { GAMES_DATA } from '../../../games/shared/games.data';

@Component({
  selector: 'app-games-list-page',
  imports: [PageWrapper, PageHeader, GamesGrid],
  templateUrl: './games-list-page.html',
})
export class GamesListPage {
  public title: string = 'JUEGOS';
  public subtitle: string = 'Elige tu desafío';
  public description: string = 'Todos los juegos requieren inicio de sesión para registrar tus estadísticas y comparar tus tiempos con otros jugadores.';
  
  public games = GAMES_DATA;

  public loginPrompt: string = 'INICIA SESIÓN PARA ACCEDER A LOS JUEGOS';
}
