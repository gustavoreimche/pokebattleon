import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { MessageService } from 'src/app/services/chat.service';
import { Message } from 'src/app/models/message.model';
import { Subscription } from 'rxjs';
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.page.html',
  styleUrls: ['./multiplayer.page.scss'],
})
export class MultiplayerPage implements OnInit {
  onlineUsers: User[] = [];

  constructor(
    @Inject(UserService) private userService: UserService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  messages: Message[] = [];
  currentRecipientId: string = '';
  newMessage: string = '';
  conversationId: string = '';
  userId: string = '';

  async ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.userId = user.uid;
      }
    });

    this.onlineUsers = await this.userService.getOnlineUsers();

    this.messageService
      .getNewMessages(this.conversationId)
      .subscribe((data) => {
        console.log(data);
        this.messages.push(data);
      });

    this.messageService.geMessagesReceived(this.userId).subscribe((data) => {
      console.log(data);
    });
  }

  ngOnChanges(): void {
    if (this.conversationId) {
      this.messageService.getMessageByConversationId(this.conversationId);
    }
  }

  startChatWithPlayer(playerId: string) {
    if (this.userId === playerId) {
      console.log('Não pode inciar uma conversa com você mesmo');
    } else {
      this.currentRecipientId = playerId;
      this.conversationId = this.generateConversationId(playerId); // Gerar um ID único para a conversa
      console.log(this.conversationId);
    }
  }

  sendMessage() {
    if (
      this.newMessage.trim() !== '' &&
      this.currentRecipientId &&
      this.conversationId
    ) {
      const message: Message = {
        conversationId: this.conversationId,
        senderId: this.userId, // Use o UID do jogador logado
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
    return 'CONVERSATION_' + this.userId + '_' + playerId;
  }
}
