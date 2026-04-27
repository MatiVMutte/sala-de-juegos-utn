import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavBar } from '../../../../shared/nav-bar/nav-bar';
import { Footer } from '../../../../shared/footer/footer';

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
  imports: [NavBar, Footer],
  templateUrl: './about-me-page.html',
})
export class AboutMePage implements OnInit {
  public title: string = 'QUIÉN SOY';
  public subtitle: string = 'Conoce al creador';
  
  public githubUser = signal<GitHubUser | null>(null);
  public loading = signal<boolean>(true);
  public error = signal<string | null>(null);
  
  private http = inject(HttpClient);
  
  ngOnInit() {
    this.fetchGitHubData();
  }
  
  private fetchGitHubData() {
    this.http.get<GitHubUser>('https://api.github.com/users/MatiVMutte')
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
