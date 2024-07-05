import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private http: HttpClient  ) { }

  getAllProducts() {
    return this.http.get(environment.baseApi +  'products');
  }

  getAllCategories() {
    return this.http.get(environment.baseApi +  'products/categories');
  }

  getProductByCategories(keyword:string) {
    return this.http.get(environment.baseApi +  'products/category/' + keyword);
  }

  getProductById(id : any) {
    return this.http.get(environment.baseApi +  'products/' + id);
  }

  createProduct(model:any){
    return this.http.post(environment.baseApi +  'products' , model );
  }

  updateProduct(id:any , modal:any){
    return this.http.put( environment.baseApi +  'products/' + id , modal )
  }


}
