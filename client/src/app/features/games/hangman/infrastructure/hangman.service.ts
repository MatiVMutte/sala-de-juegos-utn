import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../../../../shared/infrastructure/supabase.service';
import { HangmanResult } from '../domain/hangman.model';

@Injectable({ providedIn: 'root' })
export class HangmanService {
  private supabase = inject(SupabaseService).client;

  async saveResult(result: HangmanResult): Promise<void> {
    await this.supabase.from('hangman_results').insert(result);
  }
}
