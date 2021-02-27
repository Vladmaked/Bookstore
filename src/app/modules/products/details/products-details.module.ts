import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsDetailsComponent} from './components';
import {BreadcrumbsModule} from '../../core';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [ProductsDetailsComponent],
  imports: [
    CommonModule,
    BreadcrumbsModule,
    RouterModule
  ]
})
export class ProductsDetailsModule {
}
