import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoriesListComponent, CategoriesListItemComponent} from './components';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [CategoriesListItemComponent, CategoriesListComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CategoriesListComponent, CategoriesListItemComponent
  ]
})
export class CategoriesListModule {
}
