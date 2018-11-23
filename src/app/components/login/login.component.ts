import { Component } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
import { LoginService } from 'src/app/services/login.service';
import { LoginRequest } from 'src/app/models/login-request.model';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private loginService: LoginService
  ) { }

  login() {
    this.loginService.login(new LoginRequest('9199887766534', 'password')).subscribe(data => {
      console.log(data);
    })
  }
}
