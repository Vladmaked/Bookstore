import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Product} from '../../../shared/interfaces';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(public productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getAllProducts$();
  }

  getAllProducts$() {
    this.route.params.pipe(switchMap(params => {
      console.log(params[`category`]);
      return this.products$ = this.productService.getAllProductsByCategoryId(params[`category`]);
    })).subscribe();
  }

}
