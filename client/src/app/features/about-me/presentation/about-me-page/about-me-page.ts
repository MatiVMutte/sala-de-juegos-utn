import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageWrapper } from '../../../../shared/page-wrapper/page-wrapper';
import { PageHeader } from '../../../../shared/page-header/page-header';
import { SectionCard } from '../../../../shared/section-card/section-card';

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  company: string;
  location: string;
  blog: string;
  html_url: string;
}

@Component({
  selector: 'app-about-me-page',
  imports: [PageWrapper, PageHeader, SectionCard],
  templateUrl: './about-me-page.html',
})
export class AboutMePage implements OnInit {
  public githubUser = signal<GitHubUser | null>(null);
  public userURL = 'MatiVMutte';
  // Page header
  public title: string = 'QUIÉN SOY';
  public subtitle: string = 'Conoce al creador';

  // Loading / error
  public loading = signal<boolean>(true);
  public error = signal<string | null>(null);
  public loadingText: string = 'Cargando...';

  // Stats labels
  public labelRepos: string = 'Repositorios';
  public labelFollowers: string = 'Seguidores';
  public labelFollowing: string = 'Siguiendo';

  // Info section
  public sectionInfoTitle: string = 'INFORMACIÓN';
  public labelCurrently: string = 'Actualmente:';
  public labelLocation: string = 'Ubicación:';

  // Links
  public linkGitHub: string = 'Ver perfil en GitHub';
  public linkLinkedIn: string = 'LinkedIn';

  // Project section
  public sectionProjectTitle: string = 'SOBRE EL PROYECTO';
  public projectInfo: string = 'LIMBO GAMES es una plataforma diseñada para medir capacidades cognitivas y motrices a través de juegos interactivos. La inspiración visual proviene del juego Limbo, con su estética minimalista y atmosférica.';

  // Game section
  public sectionGameTitle: string = 'JUEGO PROPIO';
  public gameTitle: string = 'Hidden Goal';
  public gameDescription: string = 'Un juego de percepción y precisión: tanto la pelota como el arco están escondidos en el campo. Tu única guía es el indicador de BOOST, que sube cuanto más cerca se encuentra tu cursor del objetivo actual.';

  public gameSteps: { title: string; description: string }[] = [
    {
      title: 'ENCUENTRA LA PELOTA',
      description: 'Mueve el cursor por el campo. Observa la barra de BOOST: cuando se acerca al 100% estás sobre la pelota. Haz click en ese punto para agarrarla.'
    },
    {
      title: 'ENCUENTRA EL ARCO',
      description: 'Una vez que tengas la pelota, el boost ahora apunta al arco. La barra cambia de azul → naranja → rojo cuanto más cerca estás. Haz click sobre el arco para marcar el gol.'
    },
    {
      title: '¡GOAL!',
      description: 'Al hacer click en el arco se revela el campo completo y aparece tu tiempo final. Las posiciones son aleatorias en cada partida. El objetivo es completarlo en el menor tiempo posible.'
    }
  ];

  public gameTipsTitle: string = 'Consejos';
  public gameTips: string[] = [
    'No hagas click al azar: explorá con calma y esperá que el boost supere el 80% antes de intentar.',
    'El cursor blanco es tu puntero en el campo, no el cursor del sistema operativo.',
    'Cada partida genera posiciones aleatorias: ninguna ronda será igual a la anterior.'
  ];  
  
  private http = inject(HttpClient);
  
  ngOnInit() {
    this.fetchGitHubData();
  }
  
  private fetchGitHubData() {
    this.http.get<GitHubUser>(`https://api.github.com/users/${this.userURL}`)
      .subscribe({
        next: (data) => {
          this.githubUser.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('No se pudieron cargar los datos de GitHub');
          this.loading.set(false);
          console.error('Error fetching GitHub data:', err);
        }
      });
  }
}
