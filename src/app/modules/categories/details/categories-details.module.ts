import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BreadcrumbsModule} from '../../core';
// import {SubcategoriesListModule} from '../../subcategories';
import {ProductsListModule} from '../../products';
import {FiltersModule} from '../../core';
import {CategoriesDetailsComponent} from './components';
import {SubcategoriesListModule} from '../../subcategories/list';


@NgModule({
  declarations: [CategoriesDetailsComponent],
  imports: [
    CommonModule,
    BreadcrumbsModule,
    FiltersModule,
    ProductsListModule,
    SubcategoriesListModule
  ]
})
export class CategoriesDetailsModule {
}
