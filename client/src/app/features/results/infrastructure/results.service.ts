import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../../../shared/infrastructure/supabase.service';
import {
  HangmanResultView, HigherLowerResultView,
  TriviaResultView, HiddenGoalResultView
} from '../domain/results.model';

@Injectable({ providedIn: 'root' })
export class ResultsService {
  private supabase = inject(SupabaseService).client;

  private async getUserNamesMap(): Promise<Map<string, string>> {
    const { data, error } = await this.supabase
      .from('users')
      .select('id, nombre, apellido');

    if (error) {
      console.error('Error fetching users:', error);
      return new Map();
    }

    const map = new Map<string, string>();
    (data || []).forEach((u: any) => {
      const fullName = `${u.nombre || ''} ${u.apellido || ''}`.trim() || 'Desconocido';
      map.set(u.id, fullName);
    });
    return map;
  }

  async getHangmanResults(): Promise<HangmanResultView[]> {
    const { data, error } = await this.supabase
      .from('hangman_results')
      .select('*')
      .order('won', { ascending: false })
      .order('letters_used', { ascending: true })
      .limit(50);

    if (error) {
      console.error('Error fetching hangman results:', error);
      return [];
    }

    const userMap = await this.getUserNamesMap();

    return (data || []).map((r: any) => ({
      user_id: r.user_id,
      user_name: userMap.get(r.user_id) || 'Desconocido',
      word: r.word,
      letters_used: r.letters_used,
      duration_seconds: r.duration_seconds,
      won: r.won,
      played_at: r.played_at,
    }));
  }

  async getHigherLowerResults(): Promise<HigherLowerResultView[]> {
    const { data, error } = await this.supabase
      .from('higher_lower_results')
      .select('*')
      .order('correct_answers', { ascending: false })
      .order('total_rounds', { ascending: true })
      .limit(50);

    if (error) {
      console.error('Error fetching higher-lower results:', error);
      return [];
    }

    const userMap = await this.getUserNamesMap();

    return (data || []).map((r: any) => ({
      user_id: r.user_id,
      user_name: userMap.get(r.user_id) || 'Desconocido',
      correct_answers: r.correct_answers,
      total_rounds: r.total_rounds,
      played_at: r.played_at,
    }));
  }

  async getTriviaResults(): Promise<TriviaResultView[]> {
    const { data, error } = await this.supabase
      .from('trivia_results')
      .select('*')
      .order('correct_answers', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching trivia results:', error);
      return [];
    }

    const userMap = await this.getUserNamesMap();

    return (data || []).map((r: any) => ({
      user_id: r.user_id,
      user_name: userMap.get(r.user_id) || 'Desconocido',
      correct_answers: r.correct_answers,
      total_questions: r.total_questions,
      played_at: r.played_at,
    }));
  }

  async getHiddenGoalResults(): Promise<HiddenGoalResultView[]> {
    const { data, error } = await this.supabase
      .from('hidden_goal_results')
      .select('*')
      .order('completion_time_seconds', { ascending: true })
      .order('attempts', { ascending: true })
      .limit(50);

    if (error) {
      console.error('Error fetching hidden goal results:', error);
      return [];
    }

    const userMap = await this.getUserNamesMap();

    return (data || []).map((r: any) => ({
      user_id: r.user_id,
      user_name: userMap.get(r.user_id) || 'Desconocido',
      completion_time_seconds: r.completion_time_seconds,
      attempts: r.attempts,
      won: r.won,
      played_at: r.played_at,
    }));
  }
}
