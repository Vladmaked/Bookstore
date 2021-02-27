import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {filter, map, pairwise, throttleTime} from 'rxjs/operators';
import {BehaviorSubject, fromEvent, Observable, ReplaySubject, Subject} from 'rxjs';
import {CartService, CategoryService, ProductService} from '../../services';
import {CartItem, Category, Subcategory} from '../../models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories$: Observable<Category[]>;
  subcategories$: Observable<Subcategory[]>;
  isOpenMenuBooks = false;
  isOpenMenuAuthors = false;
  isFocus = false;
  isFocus2 = false;
  searchField: FormControl;
  totalPrice: number = 0;
  productList: CartItem[] = [];

  @ViewChild('firstMenuLevel1') firstMenu: ElementRef;

  // @ViewChild('secondMenuLevel1') secondMenuLevel1: ElementRef;
  @HostListener('click', ['$event']) onClick(e: MouseEvent) {
    if (!this.firstMenu.nativeElement.contains(e.target)) {
      this.isOpenMenuBooks = false;
    }
    // if (!this.secondMenuLevel1.nativeElement.contains(e.target)) {
    //   this.isOpenMenuAuthors = false;
    // }
  }

  constructor(
    public router: Router,
    private categoryService: CategoryService,
    private cartService: CartService) {
    this.cartService.totalPrice$.subscribe((value) => {
      this.totalPrice = value;
    });
    this.cartService.productList$.subscribe((value) => {
      this.productList = value;
    });
  }

  ngOnInit() {
    this.searchField = new FormControl();

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
    this.getAllCategories();
    this.getAllSubcategories();
  }

  getAllCategories(): void {
   this.categories$ = this.categoryService.getAllCategories();
  }

  getAllSubcategories(): void {
    this.subcategories$ = this.categoryService.getAllSubcategories();
  }

  deleteCartItem(productListItem: any) {
    this.totalPrice -= productListItem.product.price * productListItem.quantity;
    this.cartService.totalPrice$.next(this.totalPrice);
    this.cartService.totalPrice = this.totalPrice;
    this.productList = this.productList.filter(({product}) => product.id !== productListItem.product.id);
    this.cartService.productList = this.productList;
    this.cartService.productList$.next(this.productList);
  }
}
