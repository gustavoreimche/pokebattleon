export interface Message {
  conversationId: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: number;
}
