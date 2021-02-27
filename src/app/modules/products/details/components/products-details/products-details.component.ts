import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../../../../models';
import {CartService, ProductService} from '../../../../../services';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {

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
