import { Component, inject } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageWrapper } from '../../../../shared/ui/page-wrapper/page-wrapper';
import { PageHeader } from '../../../../shared/ui/page-header/page-header';
import { GamesGrid } from '../../../../shared/ui/games-grid/games-grid';
import { GAMES_DATA } from '../../../games/domain/game.model';
import { AuthService } from '../../../auth/domain/auth.service';

@Component({
  selector: 'app-home-page',
  imports: [PageWrapper, PageHeader, GamesGrid, RouterLink, UpperCasePipe],
  templateUrl: './home-page.html',
})
export class HomePage {
  private authService = inject(AuthService);
  public currentUser = this.authService.currentUser;
  public isLoggedIn = this.authService.isLoggedIn;

  logout() { this.authService.logout(); }
  public title: string = 'BIENVENIDO';
  public subtitle: string = 'Un viaje al interior de tu mente';
  public description: string = 'El objetivo del proyecto es proporcionar una plataforma donde los usuarios puedan medir sus capacidades cognitivas y motrices a través de una interfaz intuitiva que registre estadísticas detalladas de cada sesión.';
  
  public games = GAMES_DATA;

  public ctaLabel: string = 'EXPLORA LOS JUEGOS';
  public sectionGamesTitle: string = 'JUEGOS DISPONIBLES';
  public loginPrompt: string = 'INICIA SESIÓN PARA ACCEDER A LOS JUEGOS';
}
