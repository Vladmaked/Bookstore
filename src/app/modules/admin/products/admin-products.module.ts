import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminProductsViewComponent} from './components';
import {RouterModule} from '@angular/router';
import {adminProductsRouting} from './admin-products.routing';


@NgModule({
  declarations: [AdminProductsViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(adminProductsRouting)
  ]
})
export class AdminProductsModule {
}
