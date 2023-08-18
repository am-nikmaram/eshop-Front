export class ProductCategory{
    /**
     *
     */
    constructor(
        public title:string,
        public urlTitle:string,
        public parentId:number,
        public id:number
    ) {
    }
}