import { HttpRequest } from "@angular/common/http"

export interface ILoginUserAccount{
    //[x: string]: any
    isSuccess:boolean;
    message:string;
    statusCode:string;
    data:{
        access_token:string,
        expires_in:number,
        fullName:string,
        refresh_token:string,
        token_type:string,
        userName:string,
        address:string
    }
}
export interface Iaccess_token{
    access_token:string,
    expires_in:number,
    fullName:string,
    refresh_token:string,
    token_type:string,
    userName:string
}

