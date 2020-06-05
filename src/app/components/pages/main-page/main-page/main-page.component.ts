import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor() { }

  goods;

  listBestseller = listBestseller;
  listRecommendations = listRecommendations;
  listDiscountBooks = listDiscountBooks;

  showListOfGoods(listName, tabName) {
    this.showUnderline(tabName);
    this.goods = cloneAnArray(listName);
  }

  showUnderline(tabName) {
    if (tabName === '.tab-salesHits') {
      (document.querySelector('.tab-salesHits') as HTMLElement).style.textDecoration = 'underline';
      (document.querySelector('.tab-recommendations') as HTMLElement).style.textDecoration = 'none';
      (document.querySelector('.tab-discountBooks') as HTMLElement).style.textDecoration = 'none';
    }
    if (tabName === '.tab-recommendations') {
      (document.querySelector('.tab-salesHits') as HTMLElement).style.textDecoration = 'none';
      (document.querySelector('.tab-recommendations') as HTMLElement).style.textDecoration = 'underline';
      (document.querySelector('.tab-discountBooks') as HTMLElement).style.textDecoration = 'none';
    }
    if (tabName === '.tab-discountBooks') {
      (document.querySelector('.tab-salesHits') as HTMLElement).style.textDecoration = 'none';
      (document.querySelector('.tab-recommendations') as HTMLElement).style.textDecoration = 'none';
      (document.querySelector('.tab-discountBooks') as HTMLElement).style.textDecoration = 'underline';
    }
  }

  ngOnInit(): void {
    if (listBestseller.length < 5) {
      createListOfGoods(bestsellers, listBestseller);
      createListOfGoods(recommendations, listRecommendations);
      createListOfGoods(discountBooks, listDiscountBooks);
    }
    this.showListOfGoods(listBestseller, '.tab-salesHits');
  }
}

const bestsellers = [{
  img: 'Зображення хіти',
  title: 'Назва товару',
  author: 'Ім\'я автора',
  price: 'Ціна'
}];

const recommendations = [{
  img: 'Зображення рекомендації',
  title: 'Назва товару',
  author: 'Ім\'я автора',
  price: 'Ціна'
}];

const discountBooks = [{
  img: 'Зображення знижки',
  title: 'Назва товару',
  author: 'Ім\'я автора',
  price: 'Ціна'
}];

const listBestseller = [];
const listRecommendations = [];
const listDiscountBooks = [];

function createListOfGoods(fromList, toList) {
  for (let i = 0; i < 5; i++) {
    toList.push({
      img: fromList[0].img,
      title: fromList[0].title,
      author: fromList[0].author,
      price: fromList[0].price
    });
  }
}

function cloneAnArray(arr) {
  return Object.assign([], arr);
}

