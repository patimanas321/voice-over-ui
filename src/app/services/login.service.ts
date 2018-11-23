import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AppConfig } from "../app.config";
import { RegisterRequest } from "../models/register-request.model";
import { LoginRequest } from "../models/login-request.model";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(
        private http: HttpClient,
        private appConfig: AppConfig
    ){ }

    register(data: RegisterRequest){
        var url = AppConfig.settings.apiServer + '/user/register';
        return this.http.post(url, data);
    }

    login(data: LoginRequest){
        var url = AppConfig.settings.apiServer + '/user/login';
        return this.http.post(url, data);
    }
}