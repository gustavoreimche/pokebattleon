import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';
import { MessageService } from 'src/app/services/chat.service';
import { AppModule } from 'src/app/app.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ChatPageRoutingModule],
  declarations: [ChatPage],
})
export class ChatPageModule {}
