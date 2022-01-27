import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service'
import { Product } from '../../interfaces/product'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: Product[];
  cartValue: number = 0;
  now: number = Date.now();

  constructor(public cart: CartService) {
    this.cart.productChange.subscribe(products => {
      this.products = products;
      console.log("cmbio")
      this.updateCartPrice()
    });
    this.products = this.cart.getProducts();
    this.updateCartPrice();  
  }

  ngOnInit(): void {
    
  }

  updateCartPrice() {
    this.cartValue = 0;
    this.products.map((el)=>{
      this.cartValue += el.price;
    })
  }

}
