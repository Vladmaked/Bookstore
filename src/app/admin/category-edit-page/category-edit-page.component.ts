import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {CategoryService} from '../../shared/services/category.service';
import {switchMap} from 'rxjs/operators';
import {Category} from '../../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-category-edit-page',
  templateUrl: './category-edit-page.component.html',
  styleUrls: ['./category-edit-page.component.css']
})
export class CategoryEditPageComponent implements OnInit, OnDestroy {

  formCategory: FormGroup;
  submittedCategory = false;
  category: Category;
  uSub: Subscription;

  constructor(private route: ActivatedRoute,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getCategoryById();
  }


  getCategoryById() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.categoryService.getCategoryById(params.id);
      })).subscribe((category: Category) => {
      this.category = category;

      this.formCategory = new FormGroup({
        categoryName: new FormControl(category.name, Validators.required)
      });
    });
  }


  editCategory() {
    if (this.formCategory.invalid) {
      return;
    }

    this.submittedCategory = true;

    this.uSub = this.categoryService.updateCategory({
      ...this.category,
      name: this.formCategory.value.categoryName
    }).subscribe(() => {
      this.submittedCategory = false;
    });
  }


  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }
}
