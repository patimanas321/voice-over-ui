import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { LoginService } from "../services/login.service";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class NonAuthGuard implements CanActivate {
    constructor(
        private loginService: LoginService,
        private router: Router
    ) {
        
    }
  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this.loginService.isAuthenticated()) {
          return true;
      }
  
      // navigate to login page
      this.router.navigate(['/home']);
      return false;
    }
}