import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CurrentUser } from './DTOs/Account/CurrentUser';
import { AuthService } from './Services/auth.service';
import { OrderService } from './Services/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eshop';

  constructor(private authService:AuthService,private cookieService:CookieService,private orderService:OrderService) {
  }

  ngOnInit(): void {
    if(this.cookieService.check('eshopcookie')){
this.authService.checkUserAuth().subscribe({
  next:(res)=>{
    console.log(res);
    if(res.isSuccess)
    {
      console.log('sucessfuly loged in');
      const currentUser=new CurrentUser(res.data.userName,res.data.fullName,res.data.address);
      this.authService.setCurrentUser(currentUser);
      this.setOrderBasketDetail();
      
    }
    else{
      console.log('unsucessfuly loged in and cookie has removed.');
    this.cookieService.delete('eshopcookie');
    this.authService.setCurrentUser(null);
  }
  },
  error:(err)=>{
    console.log(err);
  }
});

    };
   
  }

  setOrderBasketDetail(){
    this.orderService.updateOrderBasket().subscribe({
      next:(res)=>{
        if(res.isSuccess){

          this.orderService._setOrderDetails(res.data);
        }else{
          console.log("مشکلی در بارگزاری سبد خرید به وجود آمده");
        }
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }


}
