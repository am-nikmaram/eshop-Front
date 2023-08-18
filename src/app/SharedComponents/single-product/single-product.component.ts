import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ImagePath } from 'src/Utilities/PathTools';
import { Product } from 'src/app/DTOs/Product/Product';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

@Input() product:Product;
imagePath=ImagePath;
productName:string;

ngOnInit(): void {
  this.productName=this.product.productName.replace(/\s/g,'-');
}

}
