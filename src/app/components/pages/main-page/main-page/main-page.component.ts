import {Component, HostBinding, OnInit} from '@angular/core';
import {routingAnimation} from '../../../../shared/animations/routing-animation';
import {ProductService} from '../../../../services';
import {Observable} from 'rxjs';
import {Product} from '../../../../models';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  animations: [routingAnimation]
})
export class MainPageComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing;

  products$: Observable<Product[]>;
  goods;

  selectedTab = 'best';

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getProducts$();
  }

  getProducts$() {
    this.products$ = this.productService.getAllProducts();
  }


}

