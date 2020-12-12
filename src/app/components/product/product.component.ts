import {Component, ElementRef, HostBinding, Input, OnInit, ViewChild} from '@angular/core';
import {routingAnimation} from '../../shared/animations/routing-animation';
import {Product} from '../../shared/interfaces';
import {CartService} from '../../shared/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  animations: [routingAnimation]
})
export class ProductComponent implements OnInit {
  @HostBinding('@routingAnimation') private routing;
  @ViewChild('productPhoto') productPhotoEl: ElementRef;

  constructor(private cartService: CartService) {
  }

  @Input() product: Product;


  ngOnInit(): void {
  }

  addProduct(product, evt) {
    this.cartService.addProduct(product);
    this.animateAddingProduct(evt);
  }

  private animateAddingProduct(evt): void {
    let imageEl: HTMLImageElement;
    const positionImageEl = {left: 0, top: 0};

    if (imageEl === undefined) {
      imageEl = evt.target.closest('.product').querySelector('img');
      positionImageEl.left = imageEl.getBoundingClientRect().left;
      positionImageEl.top = imageEl.getBoundingClientRect().top + window.pageYOffset;
    }
    const cloneImageEl = imageEl.cloneNode(true) as HTMLImageElement;
    cloneImageEl.style.position = 'absolute';
    cloneImageEl.style.zIndex = '2000';
    cloneImageEl.style.width = '70px';
    cloneImageEl.style.opacity = '.5';
    const cloneImageElStartPosition = imageEl.getBoundingClientRect().left + 50;
    cloneImageEl.style.left = `${cloneImageElStartPosition}px`;

    evt.target.closest('.product').after(cloneImageEl);

    const positionCloneImageEl = {
      left: cloneImageEl.getBoundingClientRect().left,
      top: cloneImageEl.getBoundingClientRect().top + window.pageYOffset
    };
    const distanceForPositionCloneImageElLeft = Math.ceil(1675 - positionCloneImageEl.left);
    const distanceForPositionCloneImageElTop = Math.ceil(40 - positionCloneImageEl.top + window.pageYOffset);
    const animationDuration = Math.sqrt(Math.pow(distanceForPositionCloneImageElLeft, 2) +
      Math.pow(distanceForPositionCloneImageElTop, 2)) / 2;

    playAnimationAddingProduct();

    function playAnimationAddingProduct() {
      cloneImageEl.animate([
        {
          transform: `translate(${distanceForPositionCloneImageElLeft}px, ${distanceForPositionCloneImageElTop}px) scale(.3)`
        }
      ], {
        duration: animationDuration,
        iterations: 1
      });
    }

    setTimeout(() => {
      cloneImageEl.remove();
    }, animationDuration);
  }

}
