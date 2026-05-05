import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-card',
  imports: [],
  templateUrl: './section-card.html',
})
export class SectionCard {
  @Input() title: string = '';
}
