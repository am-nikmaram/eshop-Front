export class Product{
    /**
     *
     */
    constructor(public id:number,
        public productName:string,
        public description:string,
        public shortDescription:string,
        public price:number,
        public imageName:string,
        public isExists:boolean,
        public isSpecial:boolean,
        public createDate:Date) {

    }
}