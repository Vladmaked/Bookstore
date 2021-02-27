import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appMaxHeightDirective]'
})
export class MaxHeightDirective {
  isActive: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('click') onClick() {
    const nextEl = this.el.nativeElement.nextSibling;
    this.isActive = !this.isActive;
    this.renderer.setStyle(nextEl, 'maxHeight', `${this.isActive ? `${nextEl.scrollHeight}px` : `0`}`);
  }
}
