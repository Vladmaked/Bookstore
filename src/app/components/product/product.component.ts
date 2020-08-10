import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {routingAnimation} from '../../shared/animations/routing-animation';
import {Product} from '../../shared/interfaces';
import {CartService} from '../../shared/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  animations: [routingAnimation]
})
export class ProductComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing;

  constructor(private cartService: CartService) {
  }

  @Input() product: Product;

  ngOnInit(): void {
  }

  addProduct(product) {
    this.cartService.addProduct(product);
  }

}
