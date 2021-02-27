import {Routes} from '@angular/router';
import {AdminProductsViewComponent} from './components';

export const adminProductsRouting: Routes = [
  {path: '', pathMatch: 'full', component: AdminProductsViewComponent}
];
