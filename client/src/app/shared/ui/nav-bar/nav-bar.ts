import { Component, inject } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { menuItems } from '../../../app.routes';
import { AuthService } from '../../../features/auth/domain/auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, UpperCasePipe],
  templateUrl: './nav-bar.html',
})
export class NavBar {
  private authService = inject(AuthService);
  public readonly menuItems = menuItems;
  public readonly brandName: string = 'LIMBO';
  public currentUser = this.authService.currentUser;
  public isLoggedIn = this.authService.isLoggedIn;

  logout() { this.authService.logout(); }
}
