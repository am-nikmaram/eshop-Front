import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { AuthService } from "src/app/Services/auth.service";
import { DomainName } from "./PathTools";

@Injectable({providedIn:'root'})
export class EshopInterceptor implements HttpInterceptor{

    constructor(private cookieService:CookieService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       // let myRequest:HttpRequest<any>=req;
       const token=this.cookieService.get('eshopcookie');
       if(token)
       {
        console.log('your token has exist');
       }
       else{
        console.log('token dosent exist');
       }
 
const myRequest = req.clone({
    
    url:DomainName+req.url,
 //   headers : req.headers.set('Authorization','Bearer '+token)
headers: req.headers.append('Authorization','Bearer '+token)
});
return next.handle(myRequest);
 }

}