import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ChatMessage } from '../models/chat-message.model';
import { AngularFireList } from 'angularfire2/database';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit , OnChanges {

  feed: any;

  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.retornaMessages();
    console.log(this.feed);
  }

  ngOnChanges() {
    this.retornaMessages();
    console.log(this.feed);
  }

  retornaMessages() {
    this.chat.getMessages().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(messages => {
      console.log(messages);
      this.feed = messages;
    });
  }

}
