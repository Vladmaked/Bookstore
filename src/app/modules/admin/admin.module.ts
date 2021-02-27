import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {adminRouting} from './admin.routing';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRouting)
  ],
  exports: [RouterModule]
})
export class AdminModule {
}
