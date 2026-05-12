import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageWrapper } from '../../../../../shared/ui/page-wrapper/page-wrapper';
import { AuthService } from '../../../../auth/domain/auth.service';
import { HigherLowerService } from '../../infrastructure/higher-lower.service';
import {
  Card, HigherLowerState, buildDeck, SUIT_SYMBOLS
} from '../../domain/higher-lower.model';

@Component({
  selector: 'app-higher-lower-page',
  imports: [PageWrapper, RouterLink],
  templateUrl: './higher-lower-page.html',
})
export class HigherLowerPage implements OnInit {
  private authService = inject(AuthService);
  private higherLowerService = inject(HigherLowerService);

  deck = signal<Card[]>([]);
  currentCard = signal<Card | null>(null);
  nextCard = signal<Card | null>(null);
  correctAnswers = signal(0);
  totalRounds = signal(0);
  state = signal<HigherLowerState>('PLAYING');
  lastResult = signal<'CORRECT' | 'WRONG' | null>(null);
  isAnimating = signal(false);
  private resultSaved = false;

  readonly suitSymbols = SUIT_SYMBOLS;

  ngOnInit() { this.newGame(); }

  newGame() {
    const d = buildDeck();
    this.deck.set(d);
    this.currentCard.set(d.pop()!);
    this.correctAnswers.set(0);
    this.totalRounds.set(0);
    this.state.set('PLAYING');
    this.lastResult.set(null);
    this.isAnimating.set(false);
    this.resultSaved = false;
  }

  guess(choice: 'HIGHER' | 'LOWER') {
    if (this.state() !== 'PLAYING' || this.isAnimating()) return;
    const d = this.deck();
    if (d.length === 0) { this.endGame(); return; }

    this.isAnimating.set(true);
    const next = d[d.length - 1];
    d.pop();
    this.deck.set([...d]);
    this.nextCard.set(next);
    this.totalRounds.update(n => n + 1);

    const diff = next.value - this.currentCard()!.value;
    const isCorrect = (choice === 'HIGHER' && diff > 0) || (choice === 'LOWER' && diff < 0) || diff === 0;

    if (isCorrect) {
      this.correctAnswers.update(n => n + 1);
      this.lastResult.set('CORRECT');
      setTimeout(() => {
        this.currentCard.set(next);
        this.nextCard.set(null);
        this.lastResult.set(null);
        this.isAnimating.set(false);
        if (this.deck().length === 0) this.endGame();
      }, 800);
    } else {
      this.lastResult.set('WRONG');
      setTimeout(() => {
        this.isAnimating.set(false);
        this.endGame();
      }, 800);
    }
  }

  private async endGame() {
    this.state.set('GAME_OVER');
    if (this.resultSaved) return;
    this.resultSaved = true;
    const user = this.authService.currentUser();
    if (!user) return;
    await this.higherLowerService.saveResult({
      user_id: user.id,
      correct_answers: this.correctAnswers(),
      total_rounds: this.totalRounds(),
    });
  }

  suitSymbol(card: Card): string {
    return this.suitSymbols[card.suit];
  }
}
