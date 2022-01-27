import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart/cart.service'


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  cartSize: number = 0;
  cartValue: number = 0;  
  now: number = Date.now();
  constructor(private cart: CartService) { }

  ngOnInit(): void {
    this.cartSize = this.cart.getProducts().length;
    this.cart.productChange.subscribe(data => {
      this.cartSize = data.length;
      this.cartValue = 0;
      data.map((el)=>{
        this.cartValue += el.price;
      })
    });

    setInterval(()=>{
      this.now = Date.now()
    },500)
  }

  
}