import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageWrapper } from '../../../../../shared/ui/page-wrapper/page-wrapper';
import { AuthService } from '../../../../auth/domain/auth.service';
import { HangmanService } from '../../infrastructure/hangman.service';
import {
  ALPHABET, HANGMAN_WORDS, HangmanState, MAX_ERRORS
} from '../../domain/hangman.model';

@Component({
  selector: 'app-hangman-page',
  imports: [PageWrapper, RouterLink],
  templateUrl: './hangman-page.html',
})
export class HangmanPage implements OnInit {
  private authService = inject(AuthService);
  private hangmanService = inject(HangmanService);

  word: string = '';
  guessed: Set<string> = new Set();
  errors: number = 0;
  state: HangmanState = 'PLAYING';
  startTime: number = 0;
  resultSaved: boolean = false;

  readonly alphabet = ALPHABET;
  readonly maxErrors = MAX_ERRORS;

  ngOnInit() { this.newGame(); }

  newGame() {
    this.word = HANGMAN_WORDS[Math.floor(Math.random() * HANGMAN_WORDS.length)];
    this.guessed = new Set();
    this.errors = 0;
    this.state = 'PLAYING';
    this.startTime = Date.now();
    this.resultSaved = false;
  }

  get displayWord(): string[] {
    return this.word.split('').map(l => this.guessed.has(l) ? l : '_');
  }

  get wrongLetters(): string[] {
    return [...this.guessed].filter(l => !this.word.includes(l));
  }

  isGuessed(letter: string): boolean { return this.guessed.has(letter); }
  isWrong(letter: string): boolean { return this.guessed.has(letter) && !this.word.includes(letter); }
  isCorrect(letter: string): boolean { return this.guessed.has(letter) && this.word.includes(letter); }

  async guess(letter: string) {
    if (this.state !== 'PLAYING' || this.guessed.has(letter)) return;
    this.guessed.add(letter);
    if (!this.word.includes(letter)) this.errors++;

    const won = this.word.split('').every(l => this.guessed.has(l));
    if (won) this.endGame('WON');
    else if (this.errors >= MAX_ERRORS) this.endGame('LOST');
  }

  private async endGame(result: 'WON' | 'LOST') {
    this.state = result;
    if (this.resultSaved) return;
    this.resultSaved = true;
    const user = this.authService.currentUser();
    if (!user) return;
    const duration = (Date.now() - this.startTime) / 1000;
    await this.hangmanService.saveResult({
      user_id: user.id,
      word: this.word,
      letters_used: this.guessed.size,
      won: result === 'WON',
      duration_seconds: Math.round(duration * 10) / 10,
    });
  }

  hangmanParts(): number { return this.errors; }
}
