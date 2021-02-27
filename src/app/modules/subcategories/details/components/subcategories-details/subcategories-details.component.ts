import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../../../../models';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';
import {ProductService} from '../../../../../services';
import {FiltersService} from '../../../../core';
// import {FiltersService} from '../../../../core';

@Component({
  selector: 'app-subcategories-details',
  templateUrl: './subcategories-details.component.html',
  styleUrls: ['./subcategories-details.component.css']
})
export class SubcategoriesDetailsComponent implements OnInit {
  products$: Observable<Product[]>;
  isActivePopupFilters: boolean = false;
  filtersItem: any = false;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private filtersService: FiltersService) {
  }

  ngOnInit(): void {
    this.getAllProductsBySubcategoryId();
    this.getStatePopupFilters();
  }

  private getAllProductsBySubcategoryId(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.products$ = this.productService.getAllProductsBySubcategoryId(params[`subcategory`]);
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
