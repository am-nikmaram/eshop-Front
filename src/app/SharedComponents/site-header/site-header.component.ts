import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { CurrentUser } from 'src/app/DTOs/Account/CurrentUser';
import { OrderBasketDetail } from 'src/app/DTOs/Order/OrderBasketDetail';
import { AuthService } from 'src/app/Services/auth.service';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent implements OnInit{

user:CurrentUser=null;
orderBasketDetail:OrderBasketDetail=null;

constructor(private authService:AuthService
  ,private cookieService:CookieService
  ,private router: Router
  ,private orderService:OrderService) {

}

  ngOnInit(): void {
     this.authService.getCurrentUser().subscribe(user=>{
      this.user=user;
     }); 

}

logOutUser(){
  console.log("start logging out");

  
  this.cookieService.delete('eshopcookie');
  this.authService.setCurrentUser(null);
  this.router.navigate(["/"]);
}

}
