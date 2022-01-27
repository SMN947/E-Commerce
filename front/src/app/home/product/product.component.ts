import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestsService } from '../../services/requests/requests.service'
import { CartService } from '../../services/cart/cart.service'
import { Product } from '../../interfaces/product'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public req: Subscription;
  product:Product;
  id:number = 1;
  constructor(private productService: RequestsService, private route: ActivatedRoute, public cart: CartService) { }

  ngOnInit(): void {    
    if (this.req) { this.req.unsubscribe(); }
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.req = this.productService.getProduct(this.id).subscribe((res: any) => {
      console.log(res)
      this.product = res[0];
    }, err => {
      console.log("fail", err)
    });
  }

  addProduct(id:number) {
    console.log(id)
  }
}
