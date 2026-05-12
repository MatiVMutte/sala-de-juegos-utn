import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { SupabaseService } from '../../../../shared/infrastructure/supabase.service';
import { TriviaQuestion, TriviaResult } from '../domain/trivia.model';

@Injectable({ providedIn: 'root' })
export class TriviaService {
  private http = inject(HttpClient);
  private supabase = inject(SupabaseService).client;

  async getQuestions(amount: number = 10): Promise<TriviaQuestion[]> {
    try {
      // Usar API de trivia en español (JSON local)
      const url = 'trivia-spanish.json';

      const response: any = await firstValueFrom(this.http.get(url));
      console.log('Trivia API response:', response);

      if (response.response_code !== 0 || !response.results) {
        throw new Error('Invalid API response');
      }

      // Mezclar y devolver la cantidad solicitada
      const allQuestions = response.results;
      const shuffled = allQuestions.sort(() => Math.random() - 0.5);
      return shuffled.slice(0, amount);
    } catch (error) {
      console.error('Trivia service error:', error);
      throw error;
    }
  }

  async saveResult(result: TriviaResult): Promise<void> {
    await this.supabase.from('trivia_results').insert(result);
  }
}
