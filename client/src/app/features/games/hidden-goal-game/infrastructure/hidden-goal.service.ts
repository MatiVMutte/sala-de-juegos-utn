import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../../../../shared/infrastructure/supabase.service';
import { HiddenGoalResult } from '../domain/hidden-goal.model';

@Injectable({ providedIn: 'root' })
export class HiddenGoalService {
  private supabase = inject(SupabaseService).client;

  async saveResult(result: HiddenGoalResult): Promise<void> {
    await this.supabase.from('hidden_goal_results').insert(result);
  }
}
