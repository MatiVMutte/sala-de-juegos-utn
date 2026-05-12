import { Component, OnInit, OnDestroy, inject, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../auth/domain/auth.service';
import { ChatService } from '../../infrastructure/chat.service';
import { ChatMessage } from '../../domain/chat-message.model';

@Component({
  selector: 'app-chat-widget',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './chat-widget.html',
})
export class ChatWidget implements OnInit, OnDestroy, AfterViewChecked {
  private authService = inject(AuthService);
  private chatService = inject(ChatService);

  @ViewChild('messagesEnd') messagesEnd!: ElementRef;

  isOpen = signal(false);
  messages = signal<ChatMessage[]>([]);
  loading = signal(false);
  sending = signal(false);
  unread = signal(0);
  messageControl = new FormControl('', [Validators.required, Validators.maxLength(300)]);
  private channel: any = null;
  private shouldScroll = false;
  private initialized = false;

  currentUserId(): string | undefined { return this.authService.currentUser()?.id; }
  isLoggedIn() { return this.authService.isLoggedIn(); }

  ngOnInit() {}

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  ngOnDestroy() {
    if (this.channel) this.channel.unsubscribe();
  }

  async toggle() {
    this.isOpen.update(v => !v);
    if (this.isOpen() && !this.initialized) {
      this.initialized = true;
      this.loading.set(true);
      const msgs = await this.chatService.getMessages();
      this.messages.set(msgs);
      this.loading.set(false);
      this.shouldScroll = true;

      this.channel = this.chatService.subscribeToMessages((msg) => {
        this.messages.update(prev => [...prev, msg]);
        if (this.isOpen()) {
          this.shouldScroll = true;
        } else {
          this.unread.update(n => n + 1);
        }
      });
    }
    if (this.isOpen()) {
      this.unread.set(0);
      this.shouldScroll = true;
    }
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
    try {
      this.messagesEnd?.nativeElement?.scrollIntoView({ behavior: 'instant' });
    } catch {}
  }
}
