import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {Router} from '@angular/router';
import {CategoryService} from '../../shared/services/category.service';
import {Category, Subcategory} from '../../shared/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  category;
  arrCategories: Array<Category> = [];
  arrSubcategories: Array<Subcategory> = [];
  cSub;
  sSub;
  subcategory;
  productName;
  input;
  subMenu = false;
  subSubMenu = false;

  constructor(
    public productService: ProductService,
    public router: Router,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit() {
    this.getAllSubcategories();
    setTimeout(() => {
      this.getAllCategories();
    }, 100);
  }

  getAllCategories() {
    this.cSub = this.categoryService.getAllCategories()
      .subscribe(categories => {
        this.arrCategories = categories;
      });
  }

  getAllSubcategories() {
    this.sSub = this.categoryService.getAllSubcategories().subscribe(subcategories => {
      this.arrSubcategories = subcategories;
    });
  }

  search() {
    this.productService.productName = this.productName;
    this.router.navigate(['/catalog']);
  }

  clearInput() {
    this.input = document.getElementsByClassName('search__input')[0];
    this.input.value = '';
    this.productName = '';
  }

  ngOnDestroy(): void {
    if (this.cSub) {
      this.cSub.unsubscribe();
    }
    if (this.sSub) {
      this.sSub.unsubscribe();
    }
  }

}
