import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
