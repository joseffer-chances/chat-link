import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuario: User;
  userEmail: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.autUser().subscribe(user => {
      if (user) {
        this.usuario = user;
        this.userEmail = user.email;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

}
