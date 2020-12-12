import {Injectable} from '@angular/core';
import {CartItem} from '../interfaces';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  productList: CartItem [] = [];
  totalPrice = 0;
  totalPrice$: Subject<number> = new Subject<number>();

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
      return;
    }
    this.totalPrice += +p.price;
    productExistInCart.quantity += 1;
    this.totalPrice$.next(this.totalPrice);
  }
}
