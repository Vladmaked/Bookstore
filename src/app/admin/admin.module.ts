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
import {QuillModule} from 'ngx-quill';
import {CategoryDashboardPageComponent} from './category-dashboard-page/category-dashboard-page.component';
import {CategoryEditPageComponent} from './category-edit-page/category-edit-page.component';
import {SubcategoryEditPageComponent} from './subcategory-edit-page/subcategory-edit-page.component';
import {SharedModule} from '../shared/shared.module';
import {AdminAuthGuard} from './shared/services/admin-auth.guard';
import {AdminAuthService} from './shared/services/admin-auth.service';
import {SearchPipe} from '../shared/pipes/search.pipe';
import {AppRoutingModule} from '../app-routing.module';

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
    SharedModule,
    // AppRoutingModule,
    QuillModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'admin', component: AdminLayoutComponent, children: [
          // {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'dashboard', component: DashboardPageComponent, canActivate: [AdminAuthGuard]},
          {path: 'add-details', component: AddPageComponent, canActivate: [AdminAuthGuard]},
          {path: 'details-dashboard', component: CategoryDashboardPageComponent, canActivate: [AdminAuthGuard]},
          {path: 'orders', component: OrdersPageComponent, canActivate: [AdminAuthGuard]},
          {path: 'details/:id/edit', component: EditPageComponent, canActivate: [AdminAuthGuard]},
          {path: 'details/:id/edit', component: CategoryEditPageComponent, canActivate: [AdminAuthGuard]},
          {path: 'details/:id/edit', component: SubcategoryEditPageComponent, canActivate: [AdminAuthGuard]}
        ]
      }
    ])
  ],
  exports: [RouterModule, SearchPipe],
  providers: [AdminAuthService, AdminAuthGuard]
})

export class AdminModule {
}
