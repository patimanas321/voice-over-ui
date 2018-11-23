import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    saveToken(token : string){
        window.localStorage.setItem("authToken", token);
    }

    getToken(): string{
        return window.localStorage.getItem("authToken");
    }

    clearToken(){
        window.localStorage.removeItem("authToken");
    }
}