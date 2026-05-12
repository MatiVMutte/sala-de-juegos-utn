import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../../../shared/infrastructure/supabase.service';
import { ChatMessage, NewChatMessage } from '../domain/chat-message.model';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private supabase = inject(SupabaseService).client;

  async getMessages(): Promise<ChatMessage[]> {
    const { data } = await this.supabase
      .from('chat_messages')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(100);
    return (data as ChatMessage[]) ?? [];
  }

  async sendMessage(msg: NewChatMessage): Promise<void> {
    await this.supabase.from('chat_messages').insert(msg);
  }

  subscribeToMessages(callback: (msg: ChatMessage) => void) {
    return this.supabase
      .channel('chat_messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat_messages' },
        (payload) => callback(payload.new as ChatMessage)
      )
      .subscribe();
  }
}
