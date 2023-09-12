import { Component, OnInit } from '@angular/core';
import { OrderBasketDetail } from 'src/app/DTOs/Order/OrderBasketDetail';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-basket-user',
  templateUrl: './basket-user.component.html',
  styleUrls: ['./basket-user.component.scss']
})
export class BasketUserComponent implements OnInit {
  orderBasketDetail:OrderBasketDetail=null;

  constructor(private orderService:OrderService){
 }
  ngOnInit(): void {
 this._getOrderDetail();
  }

  removeOrderDetail(id:number){
this.orderService.removeItemOfOrder(id).subscribe(res=>{
  if(res.isSuccess){
    console.log("remove item is success and result is:",res);
    this.orderService._setOrderDetails(res.data);
  }
})
  }

  _getOrderDetail(){
    this.orderService._getOrderDetails().subscribe(res=>{
      this.orderBasketDetail=res;
      
    })
  }
  }
