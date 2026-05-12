import { Component } from '@angular/core';
import { NavBar } from '../nav-bar/nav-bar';
import { Footer } from '../footer/footer';
import { ChatWidget } from '../../../features/chat/presentation/chat-widget/chat-widget';

@Component({
  selector: 'app-page-wrapper',
  imports: [NavBar, Footer, ChatWidget],
  templateUrl: './page-wrapper.html',
})
export class PageWrapper {}
