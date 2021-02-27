import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService, ProductService} from '../../../../services';
import {Observable, Subject, Subscription} from 'rxjs';
import {
  Category,
  Product,
  ResponseCategories, ResponseProduct,
  ResponseProducts,
  ResponseSubcategories,
  ResponseSubcategory
} from '../../../../models';
import {CategoriesService, ProductsService, SubcategoriesService} from '../../../core';
import {FiltersService} from '../../../core';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  categories$: Observable<Category[]>;
  filtersItem: any = false;
  isActivePopupFilters$: Subject<boolean>;
  subscriptions: Subscription = new Subscription();

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private filtersService: FiltersService,
              private subcategService: SubcategoriesService,
              private categService: CategoriesService,
              private prodService: ProductsService) {
  }

  ngOnInit(): void {
    this.getAllProduct();
    this.getAllCategory();
    this.getStatePopupFilters();
    // this.subscriptions.add(this.subcategService.getAllSubcategories()
    //   .subscribe((responseSubcategory: ResponseSubcategories) =>
    //     console.log(responseSubcategory)));
  }

  getAllProduct(): void {
    this.products$ = this.productService.getAllProducts();
  }

  getAllCategory(): void {
    this.categories$ = this.categoryService.getAllCategories();
    // this.categoryService.getAllCategories().subscribe(categories => {
    //   categories.forEach(category => {
    //     this.categService.createCategory(category.name).subscribe();
    //   });
    // });
  }

  activatePopupFilters() {
    this.filtersService.activatePopupFilters();
  }

  getStatePopupFilters(): void {
    this.isActivePopupFilters$ = this.filtersService.isActivePopupFilters$;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
