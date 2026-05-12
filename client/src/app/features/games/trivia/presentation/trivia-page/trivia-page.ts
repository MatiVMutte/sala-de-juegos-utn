import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageWrapper } from '../../../../../shared/ui/page-wrapper/page-wrapper';
import { AuthService } from '../../../../auth/domain/auth.service';
import { TriviaService } from '../../infrastructure/trivia.service';
import {
  TriviaQuestion, TriviaResult, TriviaState, shuffleArray
} from '../../domain/trivia.model';

@Component({
  selector: 'app-trivia-page',
  imports: [PageWrapper, RouterLink],
  templateUrl: './trivia-page.html',
})
export class TriviaPage implements OnInit {
  private authService = inject(AuthService);
  private triviaService = inject(TriviaService);

  questions = signal<TriviaQuestion[]>([]);
  currentIndex = signal(0);
  selectedAnswer = signal<string | null>(null);
  isCorrect = signal<boolean | null>(null);
  correctAnswers = signal(0);
  state = signal<TriviaState>('LOADING');
  resultSaved = false;

  ngOnInit() { this.loadQuestions(); }

  async loadQuestions() {
    this.state.set('LOADING');
    try {
      const qs = await this.triviaService.getQuestions(10);
      // Shuffle answers for each question
      const processed = qs.map(q => ({
        ...q,
        all_answers: shuffleArray([q.correct_answer, ...q.incorrect_answers])
      }));
      this.questions.set(processed);
      this.currentIndex.set(0);
      this.correctAnswers.set(0);
      this.selectedAnswer.set(null);
      this.isCorrect.set(null);
      this.resultSaved = false;
      this.state.set('PLAYING');
    } catch (err) {
      console.error('Failed to load questions:', err);
      // Retry after 2 seconds on error
      setTimeout(() => this.loadQuestions(), 2000);
    }
  }

  get currentQuestion(): TriviaQuestion | null {
    return this.questions()[this.currentIndex()] ?? null;
  }

  get progress(): string {
    return `${this.currentIndex() + 1} / ${this.questions().length}`;
  }

  selectAnswer(answer: string) {
    if (this.state() !== 'PLAYING') return;
    
    this.selectedAnswer.set(answer);
    const correct = answer === this.currentQuestion!.correct_answer;
    this.isCorrect.set(correct);
    if (correct) this.correctAnswers.update(n => n + 1);
    
    this.state.set('ANSWERED');
    
    // Auto advance after 1.5 seconds
    setTimeout(() => this.nextQuestion(), 1500);
  }

  nextQuestion() {
    if (this.currentIndex() < this.questions().length - 1) {
      this.currentIndex.update(n => n + 1);
      this.selectedAnswer.set(null);
      this.isCorrect.set(null);
      this.state.set('PLAYING');
    } else {
      this.endGame();
    }
  }

  private async endGame() {
    this.state.set('GAME_OVER');
    if (this.resultSaved) return;
    this.resultSaved = true;
    
    const user = this.authService.currentUser();
    if (!user) return;
    
    const result: TriviaResult = {
      user_id: user.id,
      correct_answers: this.correctAnswers(),
      total_questions: this.questions().length,
    };
    
    await this.triviaService.saveResult(result);
  }
}
