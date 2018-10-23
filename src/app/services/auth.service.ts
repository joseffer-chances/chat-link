import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userCurrent: Observable<firebase.User>;
  private authState: any;

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router) {
                this.userCurrent = this.afAuth.authState;
              }

  autUser() {
    return this.userCurrent = this.afAuth.authState;
  }

  getcurrentUserId(): string {
    return this.authState !== null ? this.authState.user.uid : '';
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.setUserData(email, email.substring(0, email.indexOf('@')), 'offline');
        this.setUserStatus('online');
        this.router.navigate(['chat']);
      }).catch(error => console.log(error.message));
  }

  logout() {
    //this.setUserStatus('offline');
    this.afAuth.auth.signOut();
    this.router.navigate(['login']);
  }

  signUp(email: string, password: string, displayName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
              this.authState = user;
              const status = 'online';
              this.setUserData(email, displayName, status);
            }).catch(error => console.log(error));
  }

  setUserData(email: string, displayName: string, status: string): void {
    const path = `users/${this.getcurrentUserId()}`;
    const data = {
      email: email,
      displayName: displayName,
      status: status
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  setUserStatus(status: string): void {
    const path = `users/${this.getcurrentUserId()}`;

    const data = {
      status: status
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }
}
