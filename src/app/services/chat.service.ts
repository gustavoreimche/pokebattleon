import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  refEqual,
  where,
} from '@angular/fire/firestore';
import { ref } from '@angular/fire/storage';
import { query } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Message } from 'src/app/models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}

  firestore = getFirestore();
  collectionReference = collection(this.firestore, 'messages');

  sendMessage(message: Message) {
    addDoc(this.collectionReference, message);
  }

  async getMessageByConversationId(conversationId: string): Promise<Message[]> {
    const q = query(
      collection(this.firestore, 'messages'),
      where('conversationId', '==', conversationId)
    );

    const docs = await getDocs(q);
    const messages: Message[] = [];
    docs.forEach((doc) => messages.push(doc.data() as Message));

    return messages;
  }

  getNewMessages(conversationId: string): Observable<any> {
    const q = query(
      collection(this.firestore, 'messages'),
      where('conversationId', '==', conversationId)
    );

    return new Observable((observer) => {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            observer.next(change.doc.data());
          }
        });
      });
    });
  }

  geMessagesReceived(recipientId: string): Observable<any> {
    const q = query(
      collection(this.firestore, 'messages'),
      where('recipientId', '==', recipientId)
    );

    return new Observable((observer) => {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            observer.next(change.doc.data());
          }
        });
      });
    });
  }

  getMessagesSended(userId: string): Observable<any> {
    const q = query(
      collection(this.firestore, 'messages'),
      where('senderId', '==', userId)
    );

    return new Observable((observer) => {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            observer.next(change.doc.data());
          }
        });
      });
    });
  }
}
