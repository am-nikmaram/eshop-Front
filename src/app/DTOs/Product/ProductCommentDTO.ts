import { publishFacade } from "@angular/compiler";

export class ProductCommentDTO{
    /**
     *
     */
    constructor(public id:number
        ,public productId:number
        ,public createDate:Date
        ,public text:string
        ,public userId:number
        ,public fullName:string) {
    }
}