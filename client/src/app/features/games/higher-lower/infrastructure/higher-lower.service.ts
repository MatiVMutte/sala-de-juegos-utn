import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../../../../shared/infrastructure/supabase.service';
import { HigherLowerResult } from '../domain/higher-lower.model';

@Injectable({ providedIn: 'root' })
export class HigherLowerService {
  private supabase = inject(SupabaseService).client;

  async saveResult(result: HigherLowerResult): Promise<void> {
    await this.supabase.from('higher_lower_results').insert(result);
  }
}
