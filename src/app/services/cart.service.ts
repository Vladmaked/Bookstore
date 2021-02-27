import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {CartItem} from '../models';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  productList: CartItem [] = [];
  totalPrice = 0;
  totalPrice$: Subject<number> = new Subject<number>();
  productList$: Subject<CartItem []> = new Subject<CartItem []>();

  constructor() {
  }

  addProduct(p) {
    let cartItem: CartItem;
    const productExistInCart = this.productList
      .find(({product}) => product.id === p.id);
    if (!productExistInCart) {
      cartItem = {
        product: p,
        quantity: 1
      };
      this.productList.push(cartItem);
      this.totalPrice += +cartItem.product.price;
      this.totalPrice$.next(this.totalPrice);
      this.productList$.next(this.productList);
      return;
    }
    this.totalPrice += +p.price;
    productExistInCart.quantity += 1;
    this.totalPrice$.next(this.totalPrice);
    this.productList$.next(this.productList);
  }
}
