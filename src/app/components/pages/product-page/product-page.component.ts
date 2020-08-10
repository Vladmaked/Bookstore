import {Component, HostBinding, OnInit} from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {routingAnimation} from '../../../shared/animations/routing-animation';
import {CartService} from '../../../shared/services/cart.service';
import {Observable} from 'rxjs';
import {Product} from '../../../shared/interfaces';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  animations: [routingAnimation]
})
export class ProductPageComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing;

  product$: Observable<Product>;
  isDetail = false;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.product$ = this.route.params
      .pipe(switchMap(params => {
        return this.productService.getProductById(params[`id`]);
      }));
  }

  addProduct(product) {
    this.cartService.addProduct(product);
  }

}
