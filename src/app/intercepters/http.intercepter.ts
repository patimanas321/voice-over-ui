import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "../services/token.service";

@Injectable()
export class AppHttpIntercepter implements HttpInterceptor {
    constructor(private tokenService: TokenService){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var token = this.tokenService.getToken();
        if (token) {
            request = request.clone({
                setHeaders: {
                    "Authorization": token,
                    "Accept": "Application/json",
                    "Content-type": "Application/json"
                }
            });
        }
        return next.handle(request);
    }
}