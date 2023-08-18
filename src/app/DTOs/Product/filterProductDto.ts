import { Product } from "./Product";
import { ProductOrderBy } from "./ProductOrderBy";

export class filterProductDto{
    static categories: any;
    /**
     *
     */
    constructor(public title: string, 
        public startPrice: number,
        public endPrice:number,
        public orderBy:ProductOrderBy=null,
        public categories:number[],
        public products:Product[],
        public pageId:number,
        public pageCount: number,
        public activePage:number,
        public startPage:number,
        public endPage:number,
        public takeEntity:number,
        public skipEntity:number
 
        ) {
        

    }
}