import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from 'src/app/DTOs/Product/ProductCategory';
import { filterProductDto } from 'src/app/DTOs/Product/filterProductDto';
import { ProductsService } from 'src/app/Services/products.service';

declare function  jqUiSlider();

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  filterProducts:filterProductDto=new filterProductDto("",0,500000,null,[],[],1,0,1,1,0,10,0);
  temp:number;
  
  pages:number[]=[];
  categories: ProductCategory[]=[];

  isloading:boolean=true;

  
  constructor(private productsService:ProductsService, private activatedRoute:ActivatedRoute,private router:Router) {
  }

  ngOnInit(): void {
  this.isloading=false;
 
  this.activatedRoute.queryParams.subscribe(params=>{
    let pageId=1;
    if(params['pageId']!==undefined){
      
      //  console.log(params['pageId']);
      pageId=parseInt(params['pageId'],0);
      //  console.log(parseInt(params['pageId'],0));
      }
      if(params['orderBy']!==undefined){
        this.filterProducts.orderBy=params['orderBy'];
        console.log("filterproducts.orderBy is",this.filterProducts.orderBy.toString());
      }
      this.filterProducts.categories=params['categories'] ? params['categories'] : [];
    //  console.log("categories are ",this.filterProducts.categories);
      this.filterProducts.pageId=pageId;
       this.getproducts();
      });

      this.productsService.getProductActiveCategories().subscribe(res=>{
        console.log(res);
        if(res.statusCode==="Success"){
          this.categories=res.data;
      //    console.log(this.categories);
    }
  });

  jqUiSlider();

}


getproducts(){
  console.log("filter Product is",this.filterProducts);
      this.productsService.getFilteredProducts(this.filterProducts).subscribe(res=>{
        console.log("result of query is",res.data);
        this.filterProducts=res.data;
        if(res.data.title===null){
          this.filterProducts.title="";
        }
        this.isloading=false;
        this.pages=[];
        if(res.data.categories===null){
          this.filterProducts.categories=[];
        }
  
        for(let i=this.filterProducts.startPage;i<=this.filterProducts.endPage;i++)
        {
          this.pages.push(i);
        }
      })
    }
  
    changeOrder(event:any){


      console.log(this.filterProducts);
      if(event.target.value==0){
        this.router.navigate(['products'],{queryParams:{categories:this.filterProducts.categories,orderBy:"PriceAsc"}});
        }else{
        this.router.navigate(['products'],{queryParams:{categories:this.filterProducts.categories,orderBy:"PriceDsc"}});
        }
     //this.navigateFilter();
  
    }

    filterCategories(event:any){
      const value=parseInt(event.target.value);
      if(this.filterProducts.categories===undefined || this.filterProducts.categories===null){
        this.filterProducts.categories=[];
      }
      if(event.target.checked){
        this.filterProducts.categories.push(value);
      
      }else{
        this.filterProducts.categories=this.filterProducts.categories.filter(s=>s!==value);
      }
      this.navigateFilter();
      }

      navigateFilter(){
        this.router.navigate(['products'],{queryParams:{categories:this.filterProducts.categories,orderBy:this.filterProducts.orderBy}});
      }

      
      setpage(page:number){
        this.router.navigate(['products'],{queryParams:{pageId:page,categories:this.filterProducts.categories,ordrtBy:this.filterProducts.orderBy}});
    
      }
    
      formatLabel(value: number): string {
        if (value >= 1000) {
          return Math.round(value / 1000) + 'k';
        }
    
        return `${value}`;
      }

      setMinPrice(event:any){

        const minval=parseInt(event.target.value);
        this.filterProducts.startPrice=minval;
          }
        
          setMaxPrice(event:any){
          
            const maxval=parseInt(event.target.value);
            this.filterProducts.endPrice=maxval;
              }



}
