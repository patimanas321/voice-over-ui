import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AppHttpIntercepter implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var token = 'abcd'; //read token from localstorage
        if (token) {
            request = request.clone({
                setHeaders: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "Application/json",
                    "Content-type": "Application/json"
                }
            });
        }
        return next.handle(request);
    }
}