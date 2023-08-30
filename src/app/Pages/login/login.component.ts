import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';
import { CurrentUser } from 'src/app/DTOs/Account/CurrentUser';
import { ILoginUserAccount } from 'src/app/DTOs/Account/ILoginUserAccount';
import { LoginUserDTO } from 'src/app/DTOs/Account/LoginUserDTO';
import { AuthService } from 'src/app/Services/auth.service';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   public loginedData :ILoginUserAccount;
   @ViewChild('sweetalert') private sweetalert: SwalComponent;
   retUrl:string="home";


  public loginForm= new FormGroup({
    userName:new FormControl('',[Validators.required,Validators.maxLength(100)]),
    password:new FormControl('',[Validators.required,Validators.maxLength(100)])
  });

  /**
   *
   */
  constructor(private authService:AuthService, 
    private router:Router,
    private cookieService:CookieService,
    private activatedRoute:ActivatedRoute,
    private orderService:OrderService) {

  }
  ngOnInit(): void {
    this.activatedRoute.queryParamMap
    .subscribe(params => {
this.retUrl = params.get('retUrl'); 
console.log( 'Return URL is: '+ this.retUrl);
});
  }

  submitloginForm(){

    if(this.loginForm.valid){
      const loginData=new LoginUserDTO(this.loginForm.controls.userName.value as string,this.loginForm.controls.password.value as string,"password");
console.log(loginData);
      
this.authService.loginUser(loginData).subscribe(res=>{

  console.log(res);

  if (res.isSuccess){
  //const currentUser=new CurrentUser(res.data.userName,res.data.fullName,"");
 // this.authService.setCurrentUser(currentUser);
  this.cookieService.set('eshopcookie',res.data.access_token,res.data.expires_in*60);
  //this.setOrderBasketDetail();
  this.loginForm.reset();
  const currentUser=new CurrentUser(res.data.userName,res.data.fullName,res.data.address);
  this.authService.setCurrentUser(currentUser);

  if(this.retUrl!=null){
    this.router.navigate([this.retUrl]);
  }else{
    this.router.navigate(['/']);
  }
  this.setOrderBasketDetail()

}
else{
  this.sweetalert.text=res.message;
  this.sweetalert.fire();

}

},(err:any)=>{
  console.log(err);
this.sweetalert.text="خطایی در سیستم رخ داده است";

this.sweetalert.fire();
}
)

    }
  }

  ok(){}

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
