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
    private activatedRoute:ActivatedRoute) {

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
  //wthis.loginedData=res;
  //this.temp=res?.['Data'];
//.pipe(map(x => x?.['data']))
  //this.temp=this.loginedData.Data.fullName as string;
  //console.log(res.data.fullName);
  if (res.isSuccess){
  const currentUser=new CurrentUser(res.data.userName,res.data.fullName,"");
  this.authService.setCurrentUser(currentUser);
  this.cookieService.set('eshopcookie',res.data.access_token,res.data.expires_in*60);
  this.loginForm.reset();
  if(this.retUrl!=null){
    this.router.navigate([this.retUrl]);
  }else{
    this.router.navigate(['/']);
  }

}
else{
  this.sweetalert.text=res.message;
  this.sweetalert.fire();

}
  //this.message=res.fullName;
   // this.loginedData=res;
   
  //  console.log(this.loginedData.Data.fullName);
  //const currentUser=new CurrentUser(res.Data.userName,res.Data.fullName);
  //console.log(currentUser);
  //this.authService.setCurrentUser(currentUser);
  //this.authService.getCurrentUser().subscribe(user=>{ console.log(user);})
},(err:any)=>{
  console.log(err);
this.sweetalert.text="خطایی در سیستم رخ داده است";

this.sweetalert.fire();
}
)

    }
  }

  ok(){}
}
