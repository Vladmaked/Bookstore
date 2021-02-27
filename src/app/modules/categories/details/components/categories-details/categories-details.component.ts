import {Component, OnInit} from '@angular/core';
import {Product, Subcategory} from '../../../../../models';
import {CategoryService, ProductService} from '../../../../../services';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {FiltersService} from '../../../../core';

// import {FiltersService} from '../../../../core';

@Component({
  selector: 'app-categories-details',
  templateUrl: './categories-details.component.html',
  styleUrls: ['./categories-details.component.css']
})
export class CategoriesDetailsComponent implements OnInit {
  products$: Observable<Product[]>;
  subcategories$: Observable<Subcategory[]>;
  filtersItem: any = false;
  isActivePopupFilters: boolean = false;

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private filtersService: FiltersService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getAllProductsByCategoryId();
    this.getAllSubcategoriesByCategoryId();
    this.getStatePopupFilters();
  }

  getAllProductsByCategoryId(): void {
    this.route.params.pipe(switchMap(params => {
      return this.products$ = this.productService.getAllProductsByCategoryId(params[`category`]);
    })).subscribe();
  }

  getAllSubcategoriesByCategoryId(): void {
    this.route.params.pipe(switchMap(params => {
      console.log('kek');
      this.subcategories$ = this.categoryService.getAllSubcategoriesByCategoryId(params[`category`]);
      return this.subcategories$;
    })).subscribe();
  }

  activatePopupFilters() {
    this.filtersService.activatePopupFilters();
  }

  getStatePopupFilters(): void {
    this.filtersService.isActivePopupFilters$
      .subscribe((isActivePopupFilters) => this.isActivePopupFilters = isActivePopupFilters);
  }
}
