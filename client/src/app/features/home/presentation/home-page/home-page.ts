import { Component } from '@angular/core';
import { PageWrapper } from '../../../../shared/page-wrapper/page-wrapper';
import { PageHeader } from '../../../../shared/page-header/page-header';
import { GamesGrid } from '../../../../shared/games-grid/games-grid';
import { GAMES_DATA } from '../../../games/shared/games.data';

@Component({
  selector: 'app-home-page',
  imports: [PageWrapper, PageHeader, GamesGrid],
  templateUrl: './home-page.html',
})
export class HomePage {
  public title: string = 'BIENVENIDO';
  public subtitle: string = 'Un viaje al interior de tu mente';
  public description: string = 'El objetivo del proyecto es proporcionar una plataforma donde los usuarios puedan medir sus capacidades cognitivas y motrices a través de una interfaz intuitiva que registre estadísticas detalladas de cada sesión.';
  
  public games = GAMES_DATA;

  public ctaLabel: string = 'EXPLORA LOS JUEGOS';
  public sectionGamesTitle: string = 'JUEGOS DISPONIBLES';
  public loginPrompt: string = 'INICIA SESIÓN PARA ACCEDER A LOS JUEGOS';
}
