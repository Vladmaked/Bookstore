import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BreadcrumbsModule, CoreSharedModule} from '../core';
import {ProductsListModule} from '../products';
import {CatalogComponent} from './components';
import {FiltersModule} from '../core';
import {CategoriesListModule} from '../categories';

@NgModule({
  declarations: [CatalogComponent],
  imports: [
    CommonModule,
    BreadcrumbsModule,
    FiltersModule,
    CategoriesListModule,
    ProductsListModule,
    CoreSharedModule
  ]
})
export class CatalogModule {
}
