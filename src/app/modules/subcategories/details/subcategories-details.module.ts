import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubcategoriesDetailsComponent} from './components';
import {BreadcrumbsModule} from '../../core';
import {FiltersModule} from '../../core';
import {ProductsListModule} from '../../products';


@NgModule({
  declarations: [SubcategoriesDetailsComponent],
  imports: [
    CommonModule,
    BreadcrumbsModule,
    FiltersModule,
    ProductsListModule,
  ]
})
export class SubcategoriesDetailsModule {
}
