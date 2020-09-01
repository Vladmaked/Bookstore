import {Component, ElementRef, HostBinding, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';
import {routingAnimation} from '../../../shared/animations/routing-animation';
import {CategoryService} from '../../../shared/services/category.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css'],
  animations: [routingAnimation]
})
export class CatalogPageComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing;

  products$;
  category$;
  filtersItem: any = false;

  constructor(
    public productService: ProductService,
    public categoryService: CategoryService
  ) {
  }

  @ViewChild('filters') el: ElementRef;

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.filtersItem = false;
    }
    //     else {
    //     // Logic for click inside
    //     this.filtersItem = !this.filtersItem;
    //   }
  }

  ngOnInit(): void {
    this.getProducts$();
    this.getCategories$();
  }


  getProducts$() {
    this.products$ = this.productService.getAllProducts();
  }

  getCategories$() {
    this.category$ = this.categoryService.getAllCategories();
  }
}


