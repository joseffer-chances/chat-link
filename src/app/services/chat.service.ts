import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: firebase.User;
  chatMessages: AngularFireList<ChatMessage> = null;
  chatMessage: ChatMessage;
  userCurrent: User;

  constructor(private db: AngularFireDatabase,
              private afAuth: AngularFireAuth) {
              this.afAuth.authState.subscribe(auth => {
                  if (auth !== undefined && auth !== null) {
                    this.user = auth;
                  }
                  this.getUser().subscribe(a => {
                    this.userCurrent = a;
                    console.log(this.userCurrent.displayName);
                  });
              });
  }

  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path).valueChanges();
  }

  getUsers() {
    const path = '/users';
    return this.db.list(path).valueChanges();
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages();
    const data: any = {
      email: email,
      userName: this.userCurrent.displayName,
      message: msg,
      timeSent: timestamp
    };
    this.chatMessages.push(data);
  }

  getMessages(): AngularFireList<ChatMessage> {
    // query to create our message feed binding
    return this.db.list('messages', ref => ref.limitToLast(25));
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 (now.getUTCMonth() + 1) + '/' +
                 now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes() + ':' +
                 now.getUTCSeconds();

    return (date + ' ' + time);
  }
}
