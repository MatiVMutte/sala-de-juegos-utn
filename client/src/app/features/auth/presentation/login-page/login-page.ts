import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageWrapper } from '../../../../shared/page-wrapper/page-wrapper';
import { PageHeader } from '../../../../shared/page-header/page-header';

@Component({
  selector: 'app-login-page',
  imports: [PageWrapper, PageHeader, RouterLink],
  templateUrl: './login-page.html',
})
export class LoginPage {
  public title: string = 'INICIAR SESIÓN';
  public subtitle: string = 'Accede a tu cuenta';

  public fields: { label: string; placeholder: string; type: string }[] = [
    { label: 'EMAIL',      placeholder: 'tu@correo.com', type: 'email'    },
    { label: 'CONTRASEÑA', placeholder: '••••••••',      type: 'password' },
  ];

  public btnSubmit: string = 'INGRESAR';
  public noAccountText: string = '¿No tienes cuenta?';
  public linkRegister: string = 'REGISTRARSE';
}
