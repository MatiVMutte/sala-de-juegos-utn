export interface ChatMessage {
  id: string;
  user_id: string;
  user_name: string;
  message: string;
  created_at: string;
}

export interface NewChatMessage {
  user_id: string;
  user_name: string;
  message: string;
}
