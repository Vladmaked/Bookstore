import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.css']
})
export class MainSliderComponent implements OnInit {

  slideIndex = 1;

  constructor() {
  }

  ngOnInit(): void {
    this.ibg();
    this.showSlides(this.slideIndex);
  }

  ibg() {

    const ibg = document.querySelectorAll('.ibg');

    ibg.forEach(el => {

      if (el.querySelector('img')) {

        (el as HTMLElement).style.backgroundImage = 'url(' + el.querySelector('img').getAttribute('src') + ')';
      }
    });
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n) {
    let i;
    const slides = document.getElementsByClassName('mySlides');
    const dots = document.getElementsByClassName('dot');
    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      (slides[i] as HTMLElement).style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    (slides[this.slideIndex - 1] as HTMLElement).style.display = 'block';
    dots[this.slideIndex - 1].className += ' active';
  }

}


// function ibg() {
//
//   const Ibg = document.querySelectorAll('.ibg');
//
//   Ibg.forEach(el => {
//     if (el.querySelector('img')) {
//       (el as HTMLElement).style.backgroundImage = 'url(' + el.querySelector('img').getAttribute('src') + ')';
//     }
//   });
// }

// function showSlides(n) {
//   let i;
//   const slides = document.getElementsByClassName('mySlides');
//   const dots = document.getElementsByClassName('dot');
//   if (n > slides.length) {slideIndex = 1; }
//   if (n < 1) {slideIndex = slides.length; }
//   for (i = 0; i < slides.length; i++) {
//     (slides[i] as HTMLElement).style.display = 'none';
//   }
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(' active', '');
//   }
//   (slides[slideIndex - 1] as HTMLElement).style.display = 'block';
//   dots[slideIndex - 1].className += ' active';
// }
