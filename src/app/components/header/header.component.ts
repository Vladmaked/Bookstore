import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {Router} from '@angular/router';
import {CategoryService} from '../../shared/services/category.service';
import {Category, Subcategory} from '../../shared/interfaces';
import {FormControl} from '@angular/forms';
import {filter, map, pairwise, throttleTime} from 'rxjs/operators';
import {fromEvent, Subscription} from 'rxjs';
import {CartService} from '../../shared/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  category;
  arrCategories: Array<Category> = [];
  arrSubcategories: Array<Subcategory> = [];
  private cSub: Subscription;
  private sSub: Subscription;
  subcategory;
  private productName = 'my name is Alice';
  input;
  // subMenu = false;
  // subSubMenu = false;
  isOpenMenuBooks = false;
  isOpenMenuAuthors = false;
  isFocus = false;
  searchField: FormControl;
  // isSearch = false;
  totalPrice = 0;
  // btnNode = document.querySelector('[data-btn]');

  @ViewChild('firstMenuLevel1') firstMenuLevel1: ElementRef;
  @ViewChild('secondMenuLevel1') secondMenuLevel1: ElementRef;

  @HostListener('click', ['$event']) onClick(e: MouseEvent) {
    if (!this.firstMenuLevel1.nativeElement.contains(e.target)) {
      this.isOpenMenuBooks = false;
    }
    if (!this.secondMenuLevel1.nativeElement.contains(e.target)) {
      this.isOpenMenuAuthors = false;
    }
  }

  constructor(
    public productService: ProductService,
    public router: Router,
    private categoryService: CategoryService,
    private cartService: CartService) {
    this.cartService.totalPrice$.subscribe((value) => {
      this.totalPrice = value;
    });
  }

  ngOnInit() {
    this.searchField = new FormControl();

    this.getAllSubcategories();
    setTimeout(() => {
      this.getAllCategories();
    }, 100);

    const fixedDiv: HTMLElement = document.getElementById('fixedDiv');
    fromEvent(window, 'scroll').pipe(
      throttleTime(150),
      map(() => window.pageYOffset),
      pairwise(),
      map((scrolledHeight) => scrolledHeight[1] - scrolledHeight[0]),
      filter((scrolledHeight) => Math.abs(scrolledHeight) >= 50),
      map((scrolledHeight) => scrolledHeight > 0)
    ).subscribe((isScrolledToTop) => {
      fixedDiv.classList.toggle('close', isScrolledToTop);
    });
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

  // search() {
  // this.productService.productName = this.productName;
  // this.router.navigate(['/catalog']);
  // }

  // clearInput() {
  // this.input = document.getElementsByClassName('search__input')[0];
  // this.input.value = '';
  // this.productName = '';
  // }

  ngOnDestroy(): void {
    if (this.cSub) {
      this.cSub.unsubscribe();
    }
    if (this.sSub) {
      this.sSub.unsubscribe();
    }
  }

}
