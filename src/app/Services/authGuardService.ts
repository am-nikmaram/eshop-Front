import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { CurrentUser } from "../DTOs/Account/CurrentUser";

@Injectable({
    providedIn: 'root'
  })
export class AuthGuardService implements CanActivate{
    currentUser:CurrentUser=null;
constructor(private authService:AuthService, private router:Router){
}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this.authService.isAuthenticated().then(res=>{
        if(res){
            return true;
        }else{
            this.router.navigate(['/login'],{queryParams:{retUrl:this.router.url}});
            console.log("router.Url is:",this.router.url);
        }
        return false;
       });
       
    }
    
} 