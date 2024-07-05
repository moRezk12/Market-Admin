import { product } from './../../../products/models/product';
import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  carts:any [] = [] ;
  product:any [] = [] ;
  total = 0 ;
  form!:FormGroup ;
  details:any ;

  constructor( private services:CartsService , private build:FormBuilder , private productServices:ProductsService ) {}

  ngOnInit(): void {
    this.form = this.build.group({
      start: [''],
      end: [''],
    })
    this.getAllCarts();
  }

  getAllCarts(){
    this.services.getAllCarts().subscribe((res : any) => {
      this.carts = res ;
    })
  }

  applyFilter() {
    let date = this.form.value;
    this.services.getAllCarts(date).subscribe((res : any) => {
      this.carts = res ;
    })

  }

  deleteCart(id:number){
    this.services.deleteCart(id).subscribe((res : any) => {
      this.getAllCarts();
      alert("Cart Deleted Success");
    })
  }

  view(index:number) {
    this.product = [] ;
    this.details = this.carts[index];
    // console.log(this.details);

    for(let x in this.details.products) {
      this.productServices.getProductById(this.details.products[x].productId).subscribe(res => {
        this.product.push({item:res , quantity:this.details.products[x].quantity});
        console.log(res);

      })
    }
  }





}
