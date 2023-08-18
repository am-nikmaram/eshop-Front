export class OrderBasketDetail{

    constructor(public orderId:number,public totalPrice:number,public orderDetails:orderDetail[]) {
        
    }
}

/*---------------------------------------------------------------------------------*/

export class orderDetail{

    constructor(public id:number,public count: number,public imageName:string,public price:number,public productName:string) {

    }
}

