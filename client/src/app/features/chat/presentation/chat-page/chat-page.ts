import { Component, OnInit, OnDestroy, inject, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { PageWrapper } from '../../../../shared/ui/page-wrapper/page-wrapper';
import { AuthService } from '../../../auth/domain/auth.service';
import { ChatService } from '../../infrastructure/chat.service';
import { ChatMessage } from '../../domain/chat-message.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat-page',
  imports: [PageWrapper, ReactiveFormsModule, DatePipe],
  templateUrl: './chat-page.html',
})
export class ChatPage implements OnInit, OnDestroy, AfterViewChecked {
  private authService = inject(AuthService);
  private chatService = inject(ChatService);

  @ViewChild('messagesEnd') messagesEnd!: ElementRef;

  messages = signal<ChatMessage[]>([]);
  loading = signal(true);
  sending = signal(false);
  messageControl = new FormControl('', [Validators.required, Validators.maxLength(300)]);
  private channel: any = null;
  private shouldScroll = false;

  currentUserId(): string | undefined { return this.authService.currentUser()?.id; }
  currentUserName(): string {
    const u = this.authService.currentUser();
    return u ? `${u.nombre} ${u.apellido}` : '';
  }

  async ngOnInit() {
    const msgs = await this.chatService.getMessages();
    this.messages.set(msgs);
    this.loading.set(false);
    this.shouldScroll = true;

    this.channel = this.chatService.subscribeToMessages((msg) => {
      this.messages.update(prev => [...prev, msg]);
      this.shouldScroll = true;
    });
  }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  ngOnDestroy() {
    if (this.channel) this.channel.unsubscribe();
  }

  async send() {
    const text = this.messageControl.value?.trim();
    if (!text || this.messageControl.invalid) return;
    const user = this.authService.currentUser();
    if (!user) return;

    this.sending.set(true);
    this.messageControl.reset();
    await this.chatService.sendMessage({
      user_id: user.id,
      user_name: `${user.nombre} ${user.apellido}`,
      message: text,
    });
    this.sending.set(false);
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  private scrollToBottom() {
    this.messagesEnd?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
  }
}
