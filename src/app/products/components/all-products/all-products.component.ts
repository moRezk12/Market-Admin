import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { product } from '../../models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {


  products:product[] = [] ;
  categories:string[] = [] ;
  loading:boolean = false ;
  cartProducts:any[] = [] ;
  base64:any = '' ;
  form!:FormGroup;
  id!:number ;
  mood:string = '' ;

  constructor(private serv:ProductsService ,private build:FormBuilder){}


  ngOnInit(): void {
    this.form = this.build.group({
      title: ['' , [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });

    this.getProducts();
    this.getCategories();
  }

  getProducts () {
    this.loading = true ;
    this.serv.getAllProducts().subscribe((res :any ) => {
      // console.log(res.id);
      this.products = res ;
      this.loading = false ;
      console.log(this.products);


    }, error => {
      alert("Error") ;
      this.loading = false ;

    })
  }

  getCategories () {
    this.loading = true ;
    this.serv.getAllCategories().subscribe((res :any ) => {
      // console.log(res);
      this.categories = res ;
      this.loading = false ;
    }, error => {
      alert("Error") ;
      this.loading = false ;
    })
  }

  filterCategories(event : any ) {
    let value = event.target.value ;
    // console.log(value);

    (value == "all") ? this.getProducts() : this.getProductCategorie(value);

    // if(value === "all"){
    //   this.getProducts();
    // }
    // else{
    //   this.getProductCategorie(value);
    // }
  }

  getProductCategorie(keyword : any ){
    this.loading = true ;
    this.serv.getProductByCategories(keyword).subscribe((res:any) =>{
      this.products = res ;
      this.loading = false ;
    })
  }

  addToCart(event:any){
    // console.log(event);
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      let exit = this.cartProducts.find(item => item.item.id == event.item.id)
      if(exit){
        alert(" Product is already in your cart  ")
      }
      else{
        this.cartProducts.push(event);
        localStorage.setItem("cart" , JSON.stringify(this.cartProducts) );
      }
    }
    else{
      this.cartProducts.push(event);
      localStorage.setItem("cart" , JSON.stringify(this.cartProducts) );
    }

  }


  getSelectedCatogry(event:any) {
    this.form.get('category')?.setValue(event.target.value);
    // console.log(this.form);

  }


  getImagePath(event:any) {
    const file = event.target.files[0] ;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result ;
      this.form.get('image')?.setValue(this.base64);
    }
  }

  addproduct() {
    const model = this.form.value ;

    this.serv.createProduct(model).subscribe((res:any) => {
      alert("Add Product Success")
    })
    // console.log(this.form);

  }

  update(item:any , id:number) {
    // this.form.get('title')?.setValue(item.title);
    // this.form.get('price')?.setValue(item.price);
    // this.form.get('description')?.setValue(item.description);
    // this.form.get('category')?.setValue(item.category);
    // this.form.get('image')?.setValue(item.image);
    // حل افضل
    this.form.patchValue({
      title: item.title,
      price:item.price,
      description:item.description,
      image:item.image,
      category:item.category
    })

    this.serv.updateProduct(id , this.form.value ).subscribe((res:any) => {
      console.log(res);

    })
    this.base64 = item.image ;


  }



}
