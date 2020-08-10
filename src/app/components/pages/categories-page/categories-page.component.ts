import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../../shared/services/category.service';
import {map} from 'rxjs/operators';
import {Category, Subcategory} from '../../../shared/interfaces';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit, OnDestroy {

  arrCategories: Array<Category> = [];
  arrSubcategories: Array<Subcategory> = [];
  cSub;
  sSub;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getAllSubcategories();
    setTimeout(() => {
      this.getAllCategories();
    }, 100);
  }

  getAllCategories() {
    this.cSub = this.categoryService.getAllCategories()
      .pipe(map(categories => {
        categories.forEach(category => {
          this.arrSubcategories.forEach(subcategory => {
            if (subcategory.categoryId === category.id) {
              category.iSubcategory = true;
            }
          });
        });
        return categories;
      })).subscribe(categories => {
        this.arrCategories = categories;
      });
  }

  getAllSubcategories() {
    this.sSub = this.categoryService.getAllSubcategories().subscribe(subcategories => {
      this.arrSubcategories = subcategories;
    });
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
