import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubcategoriesListComponent, SubcategoriesListItemComponent} from './components';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [SubcategoriesListItemComponent, SubcategoriesListComponent],
  exports: [
    SubcategoriesListComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SubcategoriesListModule {
}
