import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestsService } from '../../services/requests/requests.service'
import { Product } from '../../interfaces/product'

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})


export class ProductsListComponent implements OnInit, OnDestroy  {
  public req: Subscription;
  products:Product[] = [];
  
  constructor(private productService: RequestsService) { }

  ngOnInit(): void {
    if (this.req) { this.req.unsubscribe(); }
    this.req = this.productService.getProducts().subscribe((res: any) => {
      this.products = res;
    }, err => {
      console.log("fail", err)
    });
  }


  ngOnDestroy() {
    if (this.req) { this.req.unsubscribe(); }
  }
}
