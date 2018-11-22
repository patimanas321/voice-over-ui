import { Component } from '@angular/core';
import { AppConfig } from 'src/app/app.config';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private appConfig: AppConfig
  ) { }

  login() {
    console.log(AppConfig.settings);
  }
}
