import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavBar } from '../../../../shared/nav-bar/nav-bar';
import { Footer } from '../../../../shared/footer/footer';

@Component({
  selector: 'app-register-page',
  imports: [NavBar, Footer, RouterLink],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  public title: string = 'REGISTRARSE';
  public subtitle: string = 'Crea tu cuenta';
}
