import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// import {FiltersComponent, PopupFiltersComponent} from './components';
import {ReactiveFormsModule} from '@angular/forms';
// import {CategoriesListModule} from '../../categories';
import {IsHidePopupDirectiveDirective, MaxHeightDirective} from './directives';
// import {SubcategoriesListModule} from '../../subcategories';
import {PopupFiltersComponent} from './components';
import {FiltersComponent} from './components';
import {CategoriesListModule} from '../../categories';
import {SubcategoriesListModule} from '../../subcategories/list';
// import {CategoriesListModule} from '../../categories';


@NgModule({
  declarations: [FiltersComponent, PopupFiltersComponent, MaxHeightDirective, IsHidePopupDirectiveDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SubcategoriesListModule,
    CategoriesListModule
  ],
  exports: [
    PopupFiltersComponent,
    FiltersComponent
  ],
})
export class FiltersModule {
}
