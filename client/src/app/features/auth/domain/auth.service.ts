import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../../shared/infrastructure/supabase.service';

export interface UserProfile {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  edad: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabase = inject(SupabaseService).client;
  private router = inject(Router);

  private _currentUser = signal<UserProfile | null>(null);
  public currentUser = this._currentUser.asReadonly();
  public isLoggedIn = computed(() => this._currentUser() !== null);

  constructor() {
    this.supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        this.loadProfile(data.session.user.id);
      }
    });

    this.supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        this.loadProfile(session.user.id);
      } else {
        this._currentUser.set(null);
      }
    });
  }

  private async loadProfile(userId: string) {
    const { data } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    if (data) this._currentUser.set(data as UserProfile);
  }

  async login(email: string, password: string): Promise<string | null> {
    const { error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) return error.message;
    await this.router.navigate(['/']);
    return null;
  }

  async register(
    email: string,
    password: string,
    nombre: string,
    apellido: string,
    edad: number
  ): Promise<string | null> {
    const { data, error } = await this.supabase.auth.signUp({ email, password });
    if (error) return error.message;
    if (!data.user) return 'Error al crear el usuario';

    const { error: profileError } = await this.supabase
      .from('users')
      .insert({ id: data.user.id, email, nombre, apellido, edad });
    if (profileError) return profileError.message;

    await this.supabase.auth.signInWithPassword({ email, password });
    await this.router.navigate(['/']);
    return null;
  }

  async logout() {
    await this.supabase.auth.signOut();
    await this.router.navigate(['/']);
  }
}
