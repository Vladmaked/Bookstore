import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsListModule} from './list';


@NgModule({
  imports: [
    CommonModule,
    ProductsListModule
  ]
})
export class ProductsModule {
}
