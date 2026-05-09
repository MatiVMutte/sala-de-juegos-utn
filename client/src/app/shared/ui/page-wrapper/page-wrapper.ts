import { Component } from '@angular/core';
import { NavBar } from '../nav-bar/nav-bar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-page-wrapper',
  imports: [NavBar, Footer],
  templateUrl: './page-wrapper.html',
})
export class PageWrapper {}
