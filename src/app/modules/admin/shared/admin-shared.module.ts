import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminLayoutComponent} from './components';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [AdminLayoutComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [AdminLayoutComponent]
})
export class AdminSharedModule {
}
