import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { RegisterRequest } from 'src/app/models/register-request.model';
import { LoginService } from 'src/app/services/login.service';
import { AppMessages } from 'src/app/app-message.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {

  }

  errorMessage: string = '';

  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('');
  phNo = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);

  regsiterForm = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    phNo: this.phNo,
    password: this.password,
    confirmPassword: this.confirmPassword
  });

  onSubmit() {
    if(this.regsiterForm.valid && this.password.value == this,this.confirmPassword.value){
      let registerReq = new RegisterRequest(
        this.firstName.value, 
        this.lastName.value, 
        this.password.value, 
        this.phNo.value);

        this.loginService.register(registerReq).subscribe(data => {
          this.router.navigate(['/home']);
        }, err => {
          this.displayErrorMessage(err);
        });
    }
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return { invalid: true };
    }
  }

  displayErrorMessage(err){
    let errorCode = '0000';
    if(err.error && err.error.code) errorCode = err.error.code;
    this.errorMessage = AppMessages[errorCode];
  }
}
