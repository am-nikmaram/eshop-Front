import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { httpResponse } from '../DTOs/Http/HttpResponse';
import { filterProductDto } from '../DTOs/Product/filterProductDto';
import { Observable } from 'rxjs';
import { ProductCategory } from '../DTOs/Product/ProductCategory';
import { ProductOrderBy } from '../DTOs/Product/ProductOrderBy';
import { Product } from '../DTOs/Product/Product';
import { ProductDetailDTO } from '../DTOs/Product/ProductDetailDTO';
import { ProductCommentDTO } from '../DTOs/Product/ProductCommentDTO';
import { AddProductComment } from '../DTOs/Product/AddProductComment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

getFilteredProducts(filter:filterProductDto):Observable<httpResponse<filterProductDto>>{
  {
    let params=null;
    if(filter!=null){

      params=new HttpParams()
      .set('pageId',filter.pageId.toString())
      .set('title',filter.title)
      .set('startPrice',filter.startPrice.toString())
      .set('endPrice',filter.endPrice.toString())
      .set('takeEntity',filter.takeEntity.toString());
    }
    for(const category of filter.categories)
    {
      params=params.append('categories',category);
    }

    if(filter.orderBy!=null ){
      params=params.append('orderBy',filter.orderBy);
    }
    console.log('params are ',params);
    
 return this.http.get<httpResponse<filterProductDto>>("/api/v1/Products/FilterProducts",{params});
}

}

getProductActiveCategories():Observable<httpResponse<ProductCategory[]>>{
return this.http.get<httpResponse<ProductCategory[]>>("/api/v1/ProductCategories");
}

getProduct(productId:number):Observable<httpResponse<ProductDetailDTO>>{
return this.http.get<httpResponse<ProductDetailDTO>>("/api/v1/Products/ProductDetail/"+productId);
}

getRelatedProducts(productId:number):Observable<httpResponse<Product[]>>{
  return this.http.get<httpResponse<Product[]>>("/api/v1/Products/Related-Product/"+productId);
}

getProductComment(productId:number):Observable<httpResponse<ProductCommentDTO[]>>{
  return this.http.get<httpResponse<ProductCommentDTO[]>>("/api/v1/ProductComment/product-comment/"+productId);
}

addComment(comment:AddProductComment):Observable<httpResponse<any>>{
return this.http.post<httpResponse<any>>("/api/v1/ProductComment/",comment);
}

}