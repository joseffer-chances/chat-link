import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  email?: string;
  password?: string;
  errorMsg?: string;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {}

  login() {
    this.authService.login(this.email, this.password);
  }

}
