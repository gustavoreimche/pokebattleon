import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { MessageService } from 'src/app/services/chat.service';
import { Message } from 'src/app/models/message.model';
import { Subscription } from 'rxjs';
const md5 = require('md5');

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
  }

  ngOnChanges(): void {
    this.messageService.geMessagesReceived(this.userId).subscribe((data) => {
      console.log('Recebido: ', data);
    });

    this.messageService.getMessagesSended(this.userId).subscribe((data) => {
      console.log('Enviado: ', data);
    });
  }

  startChatWithPlayer(playerId: string) {
    if (this.userId === playerId) {
      console.log('Não pode inciar uma conversa com você mesmo');
    } else {
      if (this.currentRecipientId === playerId) {
      } else {
        this.messages = [];
        this.currentRecipientId = playerId;
        this.conversationId = this.generateConversationId(playerId); // Gerar um ID único para a conversa
        console.log(this.conversationId);
        this.messageService
          .getNewMessages(this.conversationId)
          .subscribe((data) => {
            console.log(data);
            this.messages.push(data);
          });
      }
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
    const concatenatedIds =
      this.userId < playerId ? this.userId + playerId : playerId + this.userId;
    return md5(concatenatedIds);
  }

  sender: string = '';
}
