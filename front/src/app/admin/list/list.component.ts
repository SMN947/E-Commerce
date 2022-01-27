import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product'
import { Subscription } from 'rxjs';
import { RequestsService } from '../../services/requests/requests.service'
import { CartService } from '../../services/cart/cart.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public req: Subscription;
  products:Product[] = [];
  
  constructor(private productService: RequestsService, public cart: CartService                     ) { }

  ngOnInit(): void {
    if (this.req) { this.req.unsubscribe(); }
    this.loadProducts()
  }

  removeProduct(id:number) {
    if (this.req) { this.req.unsubscribe(); }
    this.req = this.productService.deleteProduct(id).subscribe((res: any) => {
      console.log(res)
      this.products = res;
      this.loadProducts();
    }, err => {
      console.log("fail", err)
      this.loadProducts();
    });
  }  
  
  editProduct(id:number) {
    if (this.req) { this.req.unsubscribe(); }
    this.req = this.productService.getProduct(id).subscribe((res: any) => {
      console.log(res)
      this.products = res;
      this.loadProducts();
    }, err => {
      console.log("fail", err)
      this.loadProducts();
    });
  }

  ngOnDestroy() {
    if (this.req) { this.req.unsubscribe(); }
  }

  loadProducts() {
    this.req = this.productService.getProducts().subscribe((res: any) => {
      console.log(res)
      this.products = res;
    }, err => {
      console.log("fail", err)
    });
  }
}
