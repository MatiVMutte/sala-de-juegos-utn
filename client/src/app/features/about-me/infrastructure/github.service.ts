import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GitHubUser } from '../domain/github-user.model';

@Injectable({ providedIn: 'root' })
export class GithubService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://api.github.com/users';

  getUser(username: string): Observable<GitHubUser> {
    return this.http.get<GitHubUser>(`${this.baseUrl}/${username}`);
  }
}
