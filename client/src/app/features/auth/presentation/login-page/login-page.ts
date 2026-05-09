import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageWrapper } from '../../../../shared/ui/page-wrapper/page-wrapper';
import { PageHeader } from '../../../../shared/ui/page-header/page-header';
import { AuthService } from '../../domain/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [PageWrapper, PageHeader, RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.html',
})
export class LoginPage {
  private auth = inject(AuthService);
  private fb = inject(FormBuilder);

  public title: string = 'INICIAR SESIÓN';
  public subtitle: string = 'Accede a tu cuenta';
  public btnSubmit: string = 'INGRESAR';
  public noAccountText: string = '¿No tienes cuenta?';
  public linkRegister: string = 'REGISTRARSE';
  public quickUsersLabel: string = 'ACCESO RÁPIDO';

  public errorMessage = signal<string | null>(null);
  public loading = signal(false);

  public form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  public quickUsers = [
    { label: 'JUAN', email: 'juantiggi@gmail.com', password: '321321' },
    { label: 'ROMINA', email: 'rominamutte@gmail.com', password: '321321' },
    { label: 'MATIAS', email: 'mativmutte@gmail.com', password: '321321' },
  ];

  private friendlyError(raw: string): string {
    if (raw.toLowerCase().includes('invalid login')) return 'Email o contraseña incorrectos.';
    if (raw.toLowerCase().includes('email not confirmed')) return 'Debés confirmar tu email antes de ingresar.';
    if (raw.toLowerCase().includes('too many requests')) return 'Demasiados intentos. Esperá unos minutos.';
    return 'No se pudo iniciar sesión. Verificá tus datos.';
  }

  async onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.errorMessage.set(null);
    this.loading.set(true);
    const { email, password } = this.form.value;
    const error = await this.auth.login(email, password);
    if (error) this.errorMessage.set(this.friendlyError(error));
    this.loading.set(false);
  }

  async quickLogin(email: string, password: string) {
    this.form.setValue({ email, password });
    this.errorMessage.set(null);
    this.loading.set(true);
    const error = await this.auth.login(email, password);
    if (error) this.errorMessage.set(this.friendlyError(error));
    this.loading.set(false);
  }

  get emailControl() { return this.form.get('email')!; }
  get passwordControl() { return this.form.get('password')!; }
}
