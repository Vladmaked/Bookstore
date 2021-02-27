import {Routes} from '@angular/router';
import {AdminLayoutComponent} from './shared/components';

export const adminRouting: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AdminLayoutComponent
  },
  {
    path: 'products',
    loadChildren: () => import('./products/admin-products.module').then(m => m.AdminProductsModule)
  }
];
