import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../shared/services/product.service';
import {routingAnimation} from '../../shared/animations/routing-animation';
import {Subscription} from 'rxjs';
import {CategoryService} from '../../shared/services/category.service';
import {Category, Product, Subcategory} from '../../shared/interfaces';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css'],
  animations: [routingAnimation]
})
export class AddPageComponent implements OnInit, OnDestroy {
  @HostBinding('@routingAnimation') private routing;
  // hello
  form: FormGroup;
  submitted = false;
  arrCategories: Array<Category> = [];
  arrSubcategories: Array<Subcategory> = [];
  product: Product;
  iSubcategory: boolean;
  private sSub: Subscription;
  private cSub: Subscription;
  private cPSub: Subscription;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.createFormGroup();
    this.getAllSubcategories();
    this.getAllCategories();
  }

  createFormGroup() {
    this.form = new FormGroup({
      category: new FormControl(null, Validators.required),
      subcategory: new FormControl(null),
      title: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      photo: new FormControl(null, Validators.required),
      info: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required)
    });
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

  addProduct() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    if (this.form.value.subcategory !== undefined && this.form.value.subcategory !== null) {
      this.product = {
        category: this.form.value.category.id,
        subcategory: this.form.value.subcategory.id,
        title: this.form.value.title,
        author: this.form.value.author,
        photo: this.form.value.photo,
        info: this.form.value.info,
        price: this.form.value.price,
        date: new Date()
      };
    } else {
      this.product = {
        category: this.form.value.category.id,
        title: this.form.value.title,
        author: this.form.value.author,
        photo: this.form.value.photo,
        info: this.form.value.info,
        price: this.form.value.price,
        date: new Date()
      };
    }
    console.log(this.product);
    this.cPSub = this.productService.createProduct(this.product).subscribe(() => {
      this.form.reset();
      this.submitted = false;
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
    if (this.cPSub) {
      this.cPSub.unsubscribe();
    }
  }

  checkSubcategoryByCategoryId() {
    this.iSubcategory = this.form.get('category').value.iSubcategory;
  }
}
