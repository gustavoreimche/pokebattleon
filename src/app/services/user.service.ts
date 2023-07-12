import { Injectable } from '@angular/core';
import { getFirestore, doc, setDoc, updateDoc, getDoc } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { DocumentData } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  firestore = getFirestore();

  async getUser(userId: string): Promise<User | undefined> {
    const userDoc = doc(this.firestore, 'users', userId);
    const userSnap = await getDoc(userDoc);
    if (userSnap.exists()) {
      return userSnap.data() as User;
    } else {
      console.log(`Nenhum usuário encontrado para o ID: ${userId}`);
      return undefined;
    }
  }

  async updateUser(user: User): Promise<void> {
    const userDoc = doc(this.firestore, 'users', user.uid);
    return updateDoc(userDoc, user as unknown as DocumentData);
  }

  async createUser(user: User): Promise<void> {
    const userDoc = doc(this.firestore, 'users', user.uid);
    return setDoc(userDoc, user as unknown as DocumentData);
  }
}
