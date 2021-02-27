import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsListComponent, ProductsListItemComponent} from './components';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [ProductsListComponent, ProductsListItemComponent],
  exports: [
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ProductsListModule {
}
