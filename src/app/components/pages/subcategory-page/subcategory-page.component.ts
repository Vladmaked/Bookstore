import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../../shared/interfaces';
import {ProductService} from '../../../shared/services/product.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-subcategory-page',
  templateUrl: './subcategory-page.component.html',
  styleUrls: ['./subcategory-page.component.css']
})
export class SubcategoryPageComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(public productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getAllProducts$();
  }

  getAllProducts$() {
    this.route.params.pipe(switchMap(params => {
      console.log(params[`subcategory`]);
      return this.products$ = this.productService.getAllProductsBySubcategoryId(params[`subcategory`]);
    })).subscribe();
  }

}
