import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AppConfig } from "../app.config";
import { RegisterRequest } from "../models/register-request.model";
import { LoginRequest } from "../models/login-request.model";
import { map, flatMap } from 'rxjs/operators';
import { TokenService } from "./token.service";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(
        private http: HttpClient,
        private tokenService: TokenService
    ) { }

    register(data: RegisterRequest) {
        var url = AppConfig.settings.apiServer + '/user/register';
        return this.http.post(url, data)
            .pipe(flatMap(res => {
                return this.login(new LoginRequest(data.phNo, data.password));
            }));
    }

    login(data: LoginRequest) {
        var url = AppConfig.settings.apiServer + '/user/login';
        return this.http.post(url, data).pipe(map(data => {
            this.tokenService.saveToken(data['token']);
            return 'login successful.'
        }));
    }

    logout() {
        this.tokenService.clearToken();
    }

    isAuthenticated(){
        if(this.tokenService.getToken()) 
            return true;
            
        return false;
    }
}