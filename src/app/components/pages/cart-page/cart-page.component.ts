import {Component, HostBinding, OnInit} from '@angular/core';
import {routingAnimation} from '../../../shared/animations/routing-animation';
import {CartItem} from '../../../models';
import {CartService} from '../../../services';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
  animations: [routingAnimation]
})
export class CartPageComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing;


  productList: CartItem [] = [];
  totalPrice = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.productList = this.cartService.productList;
    this.totalPrice = this.cartService.totalPrice;
  }

  total() {
    return this.productList.reduce((sum, cartItem) => sum += cartItem.quantity, 0);
  }

  delete(cartItem) {
    this.totalPrice -= +cartItem.product.price * cartItem.quantity;
    this.cartService.totalPrice = this.totalPrice;
    this.cartService.totalPrice$.next(this.totalPrice);
    this.productList = this.productList.filter(({product}) => product.id !== cartItem.product.id);
    this.cartService.productList = this.productList;
    this.cartService.productList$.next(this.productList);
  }

  modelChanged() {
    this.totalPrice = 0;
    this.productList.forEach((cartItem) => {
      this.totalPrice += +cartItem.product.price * cartItem.quantity;
      this.cartService.totalPrice = this.totalPrice;
      this.cartService.totalPrice$.next(this.totalPrice);
      if (cartItem.quantity === 0) {
        this.delete(cartItem);
      }
    });
  }
}
