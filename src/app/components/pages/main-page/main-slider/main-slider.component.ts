import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.css']
})
export class MainSliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    ibg();
    showSlides(slideIndex);
  }

  plusSlides(n) {
    showSlides(slideIndex += n);
  }

  currentSlide(n) {
    showSlides(slideIndex = n);
  }

}

let slideIndex = 1;


function ibg() {

  const Ibg = document.querySelectorAll('.ibg');

  Ibg.forEach(el => {
    if (el.querySelector('img')){
      (el as HTMLElement).style.backgroundImage = 'url(' + el.querySelector('img').getAttribute('src') + ')';
    }
  });
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName('mySlides');
  const dots = document.getElementsByClassName('dot');
  if (n > slides.length) {slideIndex = 1; }
  if (n < 1) {slideIndex = slides.length; }
  for (i = 0; i < slides.length; i++) {
    (slides[i] as HTMLElement).style.display = 'none';
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  (slides[slideIndex - 1] as HTMLElement).style.display = 'block';
  dots[slideIndex - 1].className += ' active';
}
