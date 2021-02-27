import {AuthService} from './auth.service';
import {CartService} from './cart.service';
import {CategoryService} from './category.service';
import {OrderService} from './order.service';
import {ProductService} from './product.service';
import {LoaderService} from './loader.service';

export const appServices = [
  AuthService,
  CartService,
  CategoryService,
  OrderService,
  ProductService,
  LoaderService
];

export * from './auth.service';
export * from './cart.service';
export * from './category.service';
export * from './order.service';
export * from './product.service';
export * from './loader.service';
