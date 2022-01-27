import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';


export interface Rating {
    rate: number;
    count: number;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  exports: [
    ProductsListComponent
  ]
})
export class HomeModule { }
