import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavBar } from '../../../../shared/nav-bar/nav-bar';
import { Footer } from '../../../../shared/footer/footer';

@Component({
  selector: 'app-login-page',
  imports: [NavBar, Footer, RouterLink],
  templateUrl: './login-page.html',
})
export class LoginPage {
  public title: string = 'INICIAR SESIÓN';
  public subtitle: string = 'Accede a tu cuenta';
}
