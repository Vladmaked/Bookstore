import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Subcategory} from '../../models';
import {CategoryService} from '../../services';

@Component({
  selector: 'app-subcategory-edit-page',
  templateUrl: './subcategory-edit-page.component.html',
  styleUrls: ['./subcategory-edit-page.component.css']
})
export class SubcategoryEditPageComponent implements OnInit, OnDestroy {

  formSubcategory: FormGroup;
  submittedSubcategory = false;
  subcategory: Subcategory;
  uSub: Subscription;

  constructor(private route: ActivatedRoute,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getSubcategoryById();
  }


  getSubcategoryById() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.categoryService.getSubcategoryById(params.id);
      })).subscribe((subcategory: Subcategory) => {
      this.subcategory = subcategory;

      this.formSubcategory = new FormGroup({
        subcategoryName: new FormControl(subcategory.name, Validators.required)
      });
    });
  }


  editSubcategory() {
    if (this.formSubcategory.invalid) {
      return;
    }

    this.submittedSubcategory = true;

    this.uSub = this.categoryService.updateSubcategory({
      ...this.subcategory,
      name: this.formSubcategory.value.subcategoryName
    }).subscribe(() => {
      this.submittedSubcategory = false;
    });
  }


  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }

}
