import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ImagePath, ImagePathProductGallery } from 'src/Utilities/PathTools';
import { CurrentUser } from 'src/app/DTOs/Account/CurrentUser';
import { AddProductToOrderDto } from 'src/app/DTOs/Order/AddProductToOrderDto';
import { AddProductComment } from 'src/app/DTOs/Product/AddProductComment';
import { Product } from 'src/app/DTOs/Product/Product';
import { ProductCommentDTO } from 'src/app/DTOs/Product/ProductCommentDTO';
import { ProductDetailDTO } from 'src/app/DTOs/Product/ProductDetailDTO';
import { AuthService } from 'src/app/Services/auth.service';
import { OrderService } from 'src/app/Services/order.service';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

imagePath:string=ImagePath;
imageProductGalleryPath:string=ImagePathProductGallery;
productDetail:ProductDetailDTO;
mainImage:string;
selectedImageId=0;
relatedProduct:Product[]=[];
productComment:ProductCommentDTO[]=[];
currentUser:CurrentUser;
commentForm:FormGroup;
count:number=1;

@ViewChild('deleteSwal')
public readonly deleteSwal!: SwalComponent;
/**
 *
 */
constructor(private activatedRout : ActivatedRoute,
  private productService: ProductsService,
  private router:Router,
  private authService:AuthService,
  private orderService:OrderService) {

}
  ngOnInit(): void {
    console.log("proccess started");
    this.activatedRout.params.subscribe(params=>{
      let productId=parseInt(params['productId']);
      this.getProduct(productId);
      this.getRelatedProduct(productId);
      this.getProductComment(productId);
      this.getCurrentUser();
    });

    this.commentForm=new FormGroup({
      text:new FormControl(null,[Validators.required,Validators.maxLength(1000)])
    });
  }

getProduct(productId:number){
this.productService.getProduct(productId).subscribe(p=>{
  if(p.isSuccess===true){
    this.productDetail=p.data;
    this.mainImage=this.imagePath+this.productDetail.product.imageName;
   // console.log("productResult is ",this.productDetail);
  }else{
this.router.navigate(['/']);
  }
}  
)
}

getRelatedProduct(productId:number){
  this.productService.getRelatedProducts(productId).subscribe(result=>{
   // console.log("product Related is",result);
    if(result.isSuccess==true){
      this.relatedProduct=result.data;
  }
  });
}

getProductComment(productId:number){
  this.productService.getProductComment(productId).subscribe(res2=>{
   // console.log("comments of product are",res2);
    this.productComment=res2.data;
  });
}

getCurrentUser(){
  this.authService.getCurrentUser().subscribe(res=>{
    if(res!==null)
    this.currentUser=res;
  })
}

addComment(){
  if(this.commentForm.invalid)
  return;
  const productComment=new AddProductComment(this.productDetail.product.id,this.commentForm.controls['text'].value);
  this.productService.addComment(productComment).subscribe();
  this.getProductComment(this.productDetail.product.id);
}

addProductToOrder(){
  if(this.currentUser!=null || this.currentUser!=undefined){

    const productId=this.productDetail.product.id;
    const addProductToOrder=new AddProductToOrderDto(productId,this.count);
   // console.log("data will post to server is: ",addProductToOrder);
    /* this.orderService.addProductToOrder(addProductToOrder).subscribe(res=>{
      console.log(res);
      this.deleteSwal.fire();
    },err=>{
      console.log("error is:",err.error);
    });
    */
   this.orderService.addProductToOrder(addProductToOrder).subscribe({
     next:(res)=>{
    //  console.log("Result is successful and data is:",res);
      this.deleteSwal.fire();
      this.updateOrderBasket();
    
    },
     error:(err)=>{console.log("Result is failed and error is:",err);}
     
    });
  }else{
    this.deleteSwal.text="لطفا ابتدا با اطلاعات کاربری خود وارد شوید";
    this.deleteSwal.fire();
  }
}

increasecount(){
  this.count=this.count+1;
}

decreasecount(){
  if(this.count>0){
    this.count=this.count-1;
  }
}

updateOrderBasket(){
  if(this.currentUser!=null || this.currentUser!=undefined){
    this.orderService.updateOrderBasket().subscribe({
      next:(res)=>{
        console.log("data of update orderbasket is",res);
        this.orderService._setOrderDetails(res.data);
      },
      error:(err)=>{console.log("error of update orderbasket is",err)}
    });
  }
  else{
    this.deleteSwal.text="لطفا ابتدا وارد سایت شوید";
    this.deleteSwal.fire();
  }
}

selectImage(id:number){
  this.selectedImageId=id;
  if(id!==0){
    const gallery=this.productDetail.productGalleries.filter(g=>g.id===id)[0];
    this.mainImage=this.imageProductGalleryPath+gallery.imageName;
  }else{
    this.mainImage=this.imagePath+this.productDetail.product.imageName;
  }
}

}
