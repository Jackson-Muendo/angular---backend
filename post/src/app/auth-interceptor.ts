import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserService } from "./user.service";
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class AuthInterceptor implements HttpInterceptor {
constructor(public userservice : UserService){}
intercept(req: HttpRequest<any>, next: HttpHandler){
    const authtoken = this.userservice.gettoken();
    const authRequest = req.clone({
        headers: req.headers.set("Authorization","Bearer "+authtoken)
    });
    return next.handle(authRequest)
}
}