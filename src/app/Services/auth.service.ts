import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentUser } from '../DTOs/Account/CurrentUser';
import { IcheckUserAuthResult } from '../DTOs/Account/IcheckUserAuthResult';
import { ILoginUserAccount } from '../DTOs/Account/ILoginUserAccount';
import { LoginUserDTO } from '../DTOs/Account/LoginUserDTO';
import { RegisterUserDTO } from '../DTOs/Account/ResisterUserDTO';
import { CustomEncoder } from './custom-encoder.service';
import { editUserDto } from '../DTOs/Account/EditUserDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser=new BehaviorSubject<CurrentUser>(null);
  private loggedIn:boolean=false;

  setCurrentUser(user:CurrentUser):void{
    this.currentUser.next(user);
    if(user!=null){
      this.loggedIn=true;
    }else{
      this.loggedIn=false;
    }
  }

  isAuthenticated(){
    const promise=new Promise((resolve,resject)=>{resolve(this.loggedIn);});
    return promise;
  }

  getCurrentUser():Observable<CurrentUser>{
return this.currentUser;
  }

  constructor(private http:HttpClient) { }

  registerUser(registerData:RegisterUserDTO):Observable<any>{
return this.http.post<any>('/api/v1/users',registerData);
  }

  loginUser(loginUserDTO:LoginUserDTO):Observable<ILoginUserAccount>{
    return this.http.post<ILoginUserAccount>('/api/v1/users/token',loginUserDTO);
  }

  checkUserAuth():Observable<IcheckUserAuthResult>{
    return this.http.post<IcheckUserAuthResult>('/api/v1/users/check-auth',null);
  }

  logOut():Observable<any>{
    return this.http.get<any>('/api/v1/users/sign-out',null);
  }

  /*
  activateUser(emailActiveCode:string):Observable<any>{
    return this.http.get('/Users/activate-user/'+emailActiveCode)
  }
*/

  public confirmEmail = (token: string, email: string) => {
    let params = new HttpParams({ encoder: new CustomEncoder() })
    params = params.append('token', token);
    params = params.append('email', email);
    console.log(params);
  
    return this.http.get('/api/v1/Users/activate-user', { params: params });
  }

  updateUser(editUser: editUserDto):Observable<any>{
return this.http.put<any>('/api/v1/users',editUser);
  }
}
