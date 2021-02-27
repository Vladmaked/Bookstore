import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {CategoryService, ProductService} from '../../services';
import {Category, Subcategory} from '../../models';

@Component({
  selector: 'app-add-category-page',
  templateUrl: './category-dashboard-page.component.html',
  styleUrls: ['./category-dashboard-page.component.css']
})
export class CategoryDashboardPageComponent implements OnInit, OnDestroy {

  formCategory: FormGroup;
  formSubcategory: FormGroup;
  submittedCategory = false;
  submittedSubcategory = false;
  arrCategories: Category[];
  arrSubcategories: Subcategory[];
  category: Category;
  private crCSub: Subscription;
  private cSub: Subscription;
  private sSub: Subscription;
  private dCSub: Subscription;
  private dSSub: Subscription;
  private crSSub: Subscription;
  private uCSub: Subscription;
  private uCPSub: Subscription;

  constructor(public productService: ProductService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.createFormGroup();
    this.getAllCategories();
    this.getAllSubcategories();
  }


  createFormGroup() {
    this.formCategory = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
    this.formSubcategory = new FormGroup({
      category: new FormControl(null, Validators.required),
      subcategory: new FormControl(null, Validators.required)
    });
  }


  addCategory() {
    if (this.formCategory.invalid) {
      return;
    }
    this.submittedCategory = true;

    const category: Category = {
      name: this.formCategory.value.name
    };

    this.crCSub = this.categoryService.createCategory(category).subscribe(() => {
      this.formCategory.reset();
      this.submittedCategory = false;
      this.getAllCategories();
    });
  }


  addSubcategory() {
    if (this.formSubcategory.invalid) {
      return;
    }
    this.submittedSubcategory = true;

    const subcategory: Subcategory = {
      name: this.formSubcategory.value.subcategory,
      categoryId: this.formSubcategory.value.category.id
    };

    this.crSSub = this.categoryService.createSubcategory(subcategory).subscribe(() => {
      this.formSubcategory.reset();
      this.submittedSubcategory = false;
      this.getAllSubcategories();
    });

    this.uCSub = this.categoryService.updateCategory({
      ...this.category,
      isSubcategory: true
    }).subscribe();
  }


  getAllCategories() {
    this.cSub = this.categoryService.getAllCategories().subscribe(categories => {
      this.arrCategories = categories;
    });
  }


  getAllSubcategories() {
    this.sSub = this.categoryService.getAllSubcategories().subscribe(subcategories => {
      this.arrSubcategories = subcategories;
    });
  }


  deleteCategory(id: string) {
    this.dCSub = this.categoryService.deleteCategory(id).subscribe(() => {
      this.arrCategories = this.arrCategories.filter(category => category.id !== id);
    });
  }


  deleteSubcategory(id: string) {
    this.dSSub = this.categoryService.deleteSubcategory(id).subscribe(() => {
      this.arrSubcategories = this.arrSubcategories.filter(subcategory => subcategory.id !== id);
    });

    this.updateCategoryProperty(id);
  }


  updateCategoryProperty(id: string) {
    this.uCPSub = this.categoryService.getSubcategoryById(id)
      .subscribe((subcategory: Subcategory) => {
        this.arrSubcategories = this.arrSubcategories.filter((subcategory1: Subcategory) => subcategory1.id !== id);
        let isSubcategory = false;
        this.arrSubcategories.forEach((subcategory2: Subcategory) => {
          if (subcategory2.categoryId === subcategory.categoryId) {
            isSubcategory = true;
            console.log(isSubcategory);
          }
        });
        if (!isSubcategory) {
          console.log(isSubcategory);
          this.categoryService.updateCategory({
            ...this.category,
            isSubcategory: false
          }).subscribe();
        }
      });
  }


  getIdSelectedCategory() {
    this.categoryService.getCategoryById(this.formSubcategory.value.category.id).subscribe((category: Category) => {
      this.category = category;
    });
  }


  ngOnDestroy() {

    if (this.cSub) {
      this.cSub.unsubscribe();
    }

    if (this.sSub) {
      this.sSub.unsubscribe();
    }

    if (this.crCSub) {
      this.crCSub.unsubscribe();
    }

    if (this.crSSub) {
      this.crSSub.unsubscribe();
    }

    if (this.uCSub) {
      this.uCSub.unsubscribe();
    }

    if (this.uCPSub) {
      this.uCPSub.unsubscribe();
    }

    if (this.dCSub) {
      this.dCSub.unsubscribe();
    }

    if (this.dSSub) {
      this.dSSub.unsubscribe();
    }
  }
}
