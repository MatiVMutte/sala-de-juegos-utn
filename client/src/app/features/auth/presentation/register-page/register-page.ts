import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageWrapper } from '../../../../shared/page-wrapper/page-wrapper';
import { PageHeader } from '../../../../shared/page-header/page-header';

@Component({
  selector: 'app-register-page',
  imports: [PageWrapper, PageHeader, RouterLink],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  public title: string = 'REGISTRARSE';
  public subtitle: string = 'Crea tu cuenta';

  public fields: { label: string; placeholder: string; type: string }[] = [
    { label: 'NOMBRE',              placeholder: 'Tu nombre',     type: 'text'     },
    { label: 'EMAIL',               placeholder: 'tu@correo.com', type: 'email'    },
    { label: 'CONTRASEÑA',          placeholder: '••••••••',      type: 'password' },
    { label: 'CONFIRMAR CONTRASEÑA', placeholder: '••••••••',     type: 'password' },
  ];

  public btnSubmit: string = 'CREAR CUENTA';
  public hasAccountText: string = '¿Ya tienes cuenta?';
  public linkLogin: string = 'INICIAR SESIÓN';
}
