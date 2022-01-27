import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from 'src/app/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private api = 'https://ecommerce-smn.herokuapp.com:3000/';

  constructor(private http: HttpClient) { }
  getProducts() {
    const path = this.api + 'product';
    return this.http.get(path, {});
  }
  getProduct(id:number) {
    const path = this.api + 'product/' + id;
    return this.http.get(path, {});
  }
  deleteProduct(id:number) {
    const path = this.api + 'product/' + id;
    return this.http.delete(path, {});
  }
  updateProduct(product: Product) {
    const path = this.api + 'product/' + product.id;
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(product);
    console.log(product, path)
    return this.http.put(path, body, {'headers':headers})//put(path, body);
  }
  createProduct(product: Product) {
    const path = this.api + 'product';
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(product);
    return this.http.post(path , body, {'headers':headers})
  }
}
