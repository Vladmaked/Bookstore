import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {CategoriesService, ProductsService, SubcategoriesService} from './services';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    CategoriesService,
    SubcategoriesService,
    ProductsService
  ]
})
export class CoreSharedModule {
}
