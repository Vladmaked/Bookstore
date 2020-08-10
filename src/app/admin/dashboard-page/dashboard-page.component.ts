import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {routingAnimation} from '../../shared/animations/routing-animation';
import {ProductService} from '../../shared/services/product.service';
import {Subscription} from 'rxjs';
import {Product} from '../../shared/interfaces';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
  animations: [routingAnimation]
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  @HostBinding('@routingAnimation') private routing;

  products: Array<Product> = [];
  pSub: Subscription;
  rSub: Subscription;
  productName;
  input;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.pSub = this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }

    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }

  removeProduct(id) {
    this.rSub = this.productService.removeProduct(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
    });
  }

  clearInput() {
    this.input = document.getElementsByClassName('dashboard__search')[0];
    this.input.value = '';
    this.productName = '';
  }
}
