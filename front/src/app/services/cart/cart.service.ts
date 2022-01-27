import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../../interfaces/product'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  product: Product[];
  productChange: EventEmitter<Product[]> = new EventEmitter<Product[]>();
  constructor() {
    this.product = []
    this.productChange.emit(this.product)
  }

  addProduct(productOne: Product) {
    console.log(productOne)
    this.product.push(productOne);
    let products: Product[] = [];
    if (localStorage.getItem('Products') == null) {
      products.push(productOne);
      localStorage.setItem('Products', JSON.stringify(products));
    } else {
      products = JSON.parse(localStorage.getItem('Products')!);
      products.push(productOne);
      localStorage.setItem('Products', JSON.stringify(products));
    }
    this.change();
  }

  deleteProduct(productOne: Product) {
    console.log(productOne)
    for (let i = 0; i < this.product.length; i++) {
      if (productOne == this.product[i]) {
        this.product.splice(i, 1);
        localStorage.setItem('Products', JSON.stringify(this.product));
      }
    }
    this.product = this.getProducts()
    this.change()
  }

  deleteProducts() {
    localStorage.removeItem('Products');
    this.change()
  }

  getProducts() {
    if (localStorage.getItem('Products') == null) {
      return [];
    } else {
      this.product = JSON.parse(localStorage.getItem('Products')!);
      return this.product;
    }
  }

  change() {
    this.productChange.emit(this.getProducts())
    console.log(this.getProducts())
  }
}

