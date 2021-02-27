import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubcategoriesDetailsModule} from './details';
import {SubcategoriesListModule} from './list';


@NgModule({
  imports: [
    CommonModule,
    SubcategoriesDetailsModule,
    SubcategoriesListModule
  ]
})
export class SubcategoriesModule {
}
