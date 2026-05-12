import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PageWrapper } from '../../../../shared/ui/page-wrapper/page-wrapper';
import { ResultsService } from '../../infrastructure/results.service';
import { AuthService } from '../../../auth/domain/auth.service';
import {
  HangmanResultView, HigherLowerResultView,
  TriviaResultView, HiddenGoalResultView
} from '../../domain/results.model';

@Component({
  selector: 'app-results-page',
  imports: [PageWrapper, DatePipe],
  templateUrl: './results-page.html',
})
export class ResultsPage implements OnInit {
  private resultsService = inject(ResultsService);
  private authService = inject(AuthService);

  currentUserId = computed(() => this.authService.currentUser()?.id ?? null);

  hangmanResults = signal<HangmanResultView[]>([]);
  higherLowerResults = signal<HigherLowerResultView[]>([]);
  triviaResults = signal<TriviaResultView[]>([]);
  hiddenGoalResults = signal<HiddenGoalResultView[]>([]);
  loading = signal(true);

  ngOnInit() { this.loadResults(); }

  async loadResults() {
    this.loading.set(true);
    const [h, hl, t, hg] = await Promise.all([
      this.resultsService.getHangmanResults(),
      this.resultsService.getHigherLowerResults(),
      this.resultsService.getTriviaResults(),
      this.resultsService.getHiddenGoalResults(),
    ]);
    this.hangmanResults.set(h);
    this.higherLowerResults.set(hl);
    this.triviaResults.set(t);
    this.hiddenGoalResults.set(hg);
    this.loading.set(false);
  }
}
