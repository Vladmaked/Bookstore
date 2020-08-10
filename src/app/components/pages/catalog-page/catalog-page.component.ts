import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';
import {routingAnimation} from '../../../shared/animations/routing-animation';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css'],
  animations: [routingAnimation]
})
export class CatalogPageComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing;

  product$;
  category;

  constructor(
    public productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.getProducts$();
  }

  getProducts$() {
    this.product$ = this.productService.getAllProducts();
  }
}
