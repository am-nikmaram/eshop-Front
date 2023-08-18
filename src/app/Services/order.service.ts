import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { httpResponse } from "../DTOs/Http/HttpResponse";
import { AddProductToOrderDto } from "../DTOs/Order/AddProductToOrderDto";
import { Injectable } from "@angular/core";
import { OrderBasketDetail } from "../DTOs/Order/OrderBasketDetail";

@Injectable({
    providedIn:"root"
})
export class OrderService{
    constructor(private http:HttpClient){   
    
    }

    private orderBasketDetail:BehaviorSubject<OrderBasketDetail>=new BehaviorSubject<OrderBasketDetail>(null);

    _setOrderDetails(detail:OrderBasketDetail){
        this.orderBasketDetail.next(detail);
    }
    _getOrderDetails():Observable<OrderBasketDetail>{
        return this.orderBasketDetail;
    }


addProductToOrder(addProductToOrder:AddProductToOrderDto):Observable<httpResponse<any>>{
    return this.http.post<httpResponse<any>>("/api/v1/order/",addProductToOrder);
}

updateOrderBasket():Observable<httpResponse<OrderBasketDetail>>{
    return this.http.get<httpResponse<OrderBasketDetail>>("/api/v1/order/getorder");
}
}