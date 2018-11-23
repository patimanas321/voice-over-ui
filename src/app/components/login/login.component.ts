import { Component } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
import { LoginService } from 'src/app/services/login.service';
import { LoginRequest } from 'src/app/models/login-request.model';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AppMessages } from 'src/app/app-message.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  errorMessage: string = '';
  phNo = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  loginForm = new FormGroup({
    phNo: this.phNo,
    password: this.password,
  });

  onSubmit() {
    if (this.loginForm.valid) {
      let loginRequest = new LoginRequest(
        this.phNo.value,
        this.password.value
      );

      this.loginService.login(loginRequest).subscribe(data => {
        this.router.navigate(['/home']);
      }, err => {
        this.displayErrorMessage(err);
      });
    }
  }

  displayErrorMessage(err) {
    let errorCode = '0000';
    if (err.error && err.error.code) errorCode = err.error.code;
    this.errorMessage = AppMessages[errorCode];
  }
}
