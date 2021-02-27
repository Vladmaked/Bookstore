import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {routingAnimation} from '../../shared/animations/routing-animation';
import {Observable, Subscription} from 'rxjs';
import {Category, Product, Subcategory} from '../../models';
import {CategoryService, ProductService} from '../../services';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css'],
  animations: [routingAnimation]
})
export class EditPageComponent implements OnInit, OnDestroy {
  @HostBinding('@routingAnimation') private routing;

  form: FormGroup;
  submitted = false;
  product: Product;
  arrCategories$: Observable<Category[]>;
  arrSubcategories: Subcategory[] = [];
  cSub: Subscription;
  sSub: Subscription;
  categoryId;
  iSubcategory = false;
  private gCBSub: Subscription;

  constructor(private route: ActivatedRoute,
              public productService: ProductService,
              private router: Router,
              private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        return this.productService.getProductById(params[`id`]);
      })
    ).subscribe(product => {
      this.product = product;
      console.log('this.details', this.product);
      this.form = new FormGroup({
        category: new FormControl(product.category, Validators.required),
        subcategory: new FormControl(product.subcategory),
        title: new FormControl(product.title, Validators.required),
        author: new FormControl(product.author, Validators.required),
        photo: new FormControl(product.photo, Validators.required),
        info: new FormControl(product.info, Validators.required),
        price: new FormControl(product.price, Validators.required)
      });
      this.checkSubcategoryByCategoryId();
    });

    this.getAllCategories();
    this.getAllSubcategories();

  }

  getAllCategories() {
    this.arrCategories$ = this.categoryService.getAllCategories();
  }


  getAllSubcategories() {
    this.sSub = this.categoryService.getAllSubcategories().subscribe((subcategories: Subcategory[]) => {
      this.arrSubcategories = subcategories;
    });
  }

  updateProduct() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    this.productService.updateProduct({
      ...this.product,
      category: this.form.value.category,
      subcategory: this.form.value.subcategory,
      title: this.form.value.title,
      author: this.form.value.author,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      date: new Date()
    }).subscribe(res => {
      console.log('update(details)', res);
      this.submitted = false;
      this.router.navigate(['/admin', 'dashboard']);
    });
    this.iSubcategory = null;
  }

  ngOnDestroy() {
    if (this.cSub) {
      this.cSub.unsubscribe();
    }
    if (this.sSub) {
      this.sSub.unsubscribe();
    }
    if (this.gCBSub) {
      this.gCBSub.unsubscribe();
    }
  }

  checkSubcategoryByCategoryId() {
    console.log(this.form.get('subcategory').value);
    this.gCBSub = this.categoryService.getCategoryById(this.form.get('category').value).subscribe((category: Category) => {
      this.iSubcategory = category.isSubcategory;
    });
  }
}
