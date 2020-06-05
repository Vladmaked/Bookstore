import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogComponent } from './components/pages/catalog/catalog.component';
import { AccountComponent } from './components/pages/account/account.component';
import { ErrorPageComponent } from './components/pages/error-page/error-page.component';
import { InformationPageComponent } from './components/pages/information-page/information-page.component';
import { LoginRegistrationComponent } from './components/pages/login-registration/login-registration.component';
import { MainPageComponent } from './components/pages/main-page/main-page/main-page.component';
import {MainLayoutComponent} from './shared/main-layout/main-layout.component';
import {ProductPageComponent} from './components/pages/product-page/product-page.component';
import {CartPageComponent} from './components/pages/cart-page/cart-page.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: MainPageComponent},
      {path: 'product/:id', component: ProductPageComponent},
      {path: 'cart', component: CartPageComponent},
      {path: 'catalog', component: CatalogComponent}
    ]
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
