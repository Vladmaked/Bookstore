import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminLayoutComponent} from './shared/admin-layout/admin-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AddPageComponent} from './add-page/add-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {OrdersPageComponent} from './orders-page/orders-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {AuthGuard} from '../shared/auth.guard';
import {QuillModule} from 'ngx-quill';
import {SearchPipe} from '../shared/pipes/search.pipe';
import { CategoryDashboardPageComponent } from './category-dashboard-page/category-dashboard-page.component';
import { CategoryEditPageComponent } from './category-edit-page/category-edit-page.component';
import { SubcategoryEditPageComponent } from './subcategory-edit-page/subcategory-edit-page.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    AddPageComponent, EditPageComponent,
    OrdersPageComponent,
    DashboardPageComponent,
    SearchPipe,
    CategoryDashboardPageComponent,
    CategoryEditPageComponent,
    SubcategoryEditPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
          {path: 'add-product', component: AddPageComponent, canActivate: [AuthGuard]},
          {path: 'category-dashboard', component: CategoryDashboardPageComponent, canActivate: [AuthGuard]},
          {path: 'orders', component: OrdersPageComponent, canActivate: [AuthGuard]},
          {path: 'product/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]},
          {path: 'category/:id/edit', component: CategoryEditPageComponent, canActivate: [AuthGuard]},
          {path: 'subcategory/:id/edit', component: SubcategoryEditPageComponent, canActivate: [AuthGuard]}
        ]
      }
    ])
  ],
  exports: [RouterModule, SearchPipe]
})

export class AdminModule {
}
