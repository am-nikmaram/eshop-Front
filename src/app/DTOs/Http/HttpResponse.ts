export interface httpResponse<T>{
    isSuccess:boolean,
    message:string,
    statusCode:string,
    data:T
}