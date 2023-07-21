import { Component, Inject, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  messages: Message[] = [];
  currentRecipientId: string = '';
  newMessage: string = '';
  conversationId: string = '';

  constructor(@Inject(MessageService) private messageService: MessageService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.conversationId) {
      this.messageService.getMessageByConversationId(this.conversationId);
    }
  }

  startChatWithPlayer(playerId: string = 'PPFVJK1RhwO7q3Vv8y8Zc0f0Ugo1') {
    this.currentRecipientId = playerId;
    this.conversationId = this.generateConversationId(playerId); // Gerar um ID único para a conversa
  }

  sendMessage() {
    if (
      this.newMessage.trim() !== '' &&
      this.currentRecipientId &&
      this.conversationId
    ) {
      const message: Message = {
        conversationId: this.conversationId,
        senderId: 'GbD3qy6HJshsCBBeovg9KQSDnKH3', // Use o UID do jogador logado
        recipientId: this.currentRecipientId,
        content: this.newMessage,
        timestamp: Date.now(),
      };

      this.messageService.sendMessage(message);
    }
  }

  private generateConversationId(playerId: string): string {
    // Implemente uma lógica para gerar um ID único para a conversa.
    // Isso pode ser um hash, uma combinação dos UIDs dos jogadores envolvidos,
    // ou qualquer outra abordagem que garanta a unicidade para cada conversa.
    // Neste exemplo, estamos simplesmente concatenando os UIDs dos jogadores.
    return 'CONVERSATION_' + 'GbD3qy6HJshsCBBeovg9KQSDnKH3' + '_' + playerId;
  }
}
