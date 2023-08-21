import { Component, OnInit } from '@angular/core';
import { OrderBasketDetail } from 'src/app/DTOs/Order/OrderBasketDetail';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-header-basket',
  templateUrl: './header-basket.component.html',
  styleUrls: ['./header-basket.component.scss']
})
export class HeaderBasketComponent implements OnInit {

  detail:OrderBasketDetail=null;
  /**
   *
   */
  constructor(public orderService:OrderService) {

  }
  ngOnInit(): void {
    this.orderService._getOrderDetails().subscribe({
      next:(res)=>{
        this.detail=res;
        console.log("detail of orderbasket is:",this.detail);
      }
    });
  }
  
  removeItem(id:number){
    console.log("number of will be delete form basket order",id);
    this.orderService.removeItemOfOrder(id).subscribe({
      next:(res)=>{
        if(res.isSuccess){
          this.detail=res.data;
        }
      },
      error:(err)=>{console.log("an error has happen and data is:",err)}
    });
  }
}
