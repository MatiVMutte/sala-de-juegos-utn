import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { PageWrapper } from '../../../../shared/ui/page-wrapper/page-wrapper';
import { PageHeader } from '../../../../shared/ui/page-header/page-header';
import { AuthService } from '../../domain/auth.service';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirm = control.get('confirmPassword')?.value;
  return password && confirm && password !== confirm ? { passwordMismatch: true } : null;
}

@Component({
  selector: 'app-register-page',
  imports: [PageWrapper, PageHeader, RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  private auth = inject(AuthService);
  private fb = inject(FormBuilder);

  public title: string = 'REGISTRARSE';
  public subtitle: string = 'Crea tu cuenta';
  public btnSubmit: string = 'CREAR CUENTA';
  public hasAccountText: string = '¿Ya tienes cuenta?';
  public linkLogin: string = 'INICIAR SESIÓN';

  public errorMessage = signal<string | null>(null);
  public loading = signal(false);

  public form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    apellido: ['', [Validators.required, Validators.minLength(2)]],
    edad: [null, [Validators.required, Validators.min(1), Validators.max(120)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  }, { validators: passwordMatchValidator });

  private friendlyError(raw: string): string {
    if (raw.toLowerCase().includes('already registered') || raw.toLowerCase().includes('user already exists')) {
      return 'Ya existe una cuenta con ese email.';
    }
    if (raw.toLowerCase().includes('password')) return 'La contraseña no cumple los requisitos mínimos.';
    if (raw.toLowerCase().includes('email')) return 'El email ingresado no es válido.';
    return 'No se pudo crear la cuenta. Intentá nuevamente.';
  }

  async onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.errorMessage.set(null);
    this.loading.set(true);
    const { nombre, apellido, edad, email, password } = this.form.value;
    const error = await this.auth.register(email, password, nombre, apellido, edad);
    if (error) this.errorMessage.set(this.friendlyError(error));
    this.loading.set(false);
  }

  get nombreControl() { return this.form.get('nombre')!; }
  get apellidoControl() { return this.form.get('apellido')!; }
  get edadControl() { return this.form.get('edad')!; }
  get emailControl() { return this.form.get('email')!; }
  get passwordControl() { return this.form.get('password')!; }
  get confirmPasswordControl() { return this.form.get('confirmPassword')!; }
}
