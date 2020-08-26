import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderService} from '../../../shared/services/order.service';
import {ProductService} from '../../../shared/services/product.service';
import {CartService} from '../../../shared/services/cart.service';
import {CartItem, Order} from '../../../shared/interfaces';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

  productList: CartItem [] = [];
  totalPrice = 0;

  form: FormGroup;
  submitted = false;

  popup = false;
  popupInformation = false;
  orderListIsOpen = false;
  body;

  constructor(private orderService: OrderService,
              private productService: ProductService,
              private cartService: CartService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.productList = this.cartService.productList;
    this.totalPrice = this.cartService.totalPrice;
    this.createFormGroup();
    if (this.productList.length < 1) {
      this.route.navigate(['/catalog']);
    }

    this.body = document.querySelector('body');
  }

  total() {
    return this.productList.reduce((sum, cartItem) => sum += cartItem.quantity, 0);
  }

  createFormGroup() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      street0: new FormControl(null, Validators.required),
      street1: new FormControl(null, Validators.required),
      postcode: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      additionalInformation: new FormControl(null)
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    const order: Order = {
      name: this.form.value.name,
      surname: this.form.value.surname,
      phone: this.form.value.phone,
      street0: this.form.value.street0,
      street1: this.form.value.street1,
      postcode: this.form.value.postcode,
      city: this.form.value.city,
      additionalInformation: this.form.value.additionalInformation ? this.form.value.additionalInformation : '',
      payment: this.form.value.payment ? this.form.value.payment : '',
      price: this.cartService.totalPrice,
      orders: this.cartService.productList,
      date: new Date()
    };
    this.orderService.create(order).subscribe(() => {
      this.form.reset();
      this.submitted = false;
      this.popup = false;
      this.popupInformation = true;
    });
  }
}
