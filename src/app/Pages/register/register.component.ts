import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { RegisterUserDTO } from 'src/app/DTOs/Account/ResisterUserDTO';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {
  public registerForm= new FormGroup({
    userName:new FormControl('',[Validators.required,Validators.maxLength(100)]),
    email:new FormControl('',[Validators.email,Validators.required,Validators.maxLength(100)]),
    password:new FormControl('',[Validators.required,Validators.maxLength(100)]),
    confirmpassword:new FormControl('',[Validators.required,Validators.maxLength(100)]),
    fullName:new FormControl('',[Validators.required,Validators.maxLength(100)])
  });

@ViewChild('sweetalert')
public readonly sweetalert!: SwalComponent;
/**
 *
 */
constructor(private authService:AuthService) {

}


submitRegisterForm(){
  const registerData=new RegisterUserDTO(
    this.registerForm.get('userName')?.value as unknown as string,
    this.registerForm.get('fullName')?.value as unknown as string,
    this.registerForm.get('email')?.value as unknown as string,
    this.registerForm.controls.password.value as unknown as string,
    this.registerForm.controls.confirmpassword.value as unknown as string,
    "http://localhost:4200/activate-account"
    );
   // console.log(registerData);
    this.authService.registerUser(registerData).subscribe(res=>{
      console.log(res);
      if(res.isSuccess){
      this.registerForm.reset();
      }
      else{
       // this.errormsg=res.message;
       this.sweetalert.text=res.message;
       console.log(res.message);
        this.sweetalert.fire();
      }
    },(error:HttpErrorResponse) => {
      // let validationErrorDictionary = JSON.parse(error.text());
      // for (var fieldName in validationErrorDictionary) {
      //     if (validationErrorDictionary.hasOwnProperty(fieldName)) {
      //         this.errors.push(validationErrorDictionary[fieldName]);
      //     }
      // }
      // this.alertService.errorMsg(this.errors);
      console.log(error.error);
      this.sweetalert.text=error.statusText;
      this.sweetalert.fire();
  }
  
    );
 
}
 ok(){

 }
}
