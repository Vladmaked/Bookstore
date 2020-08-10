import {Injectable} from '@angular/core';
import {CartItem} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  productList: CartItem [] = [];
  totalPrice = 0;

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
      return;
    }
    this.totalPrice += +p.price;
    productExistInCart.quantity += 1;
  }
}
