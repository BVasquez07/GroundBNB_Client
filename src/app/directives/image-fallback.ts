import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: 'img[appImageFallback]', // This targets any <img> with this attribute
  standalone: true
})
export class ImageFallbackDirective {
  @Input() appImageFallback: string = '/assets/house3.png';

  constructor(private eRef: ElementRef) {}

  @HostListener('error')
  loadFallback() {
    const element: HTMLImageElement = this.eRef.nativeElement;
  
    if (element.src !== this.appImageFallback) {
      element.src = this.appImageFallback;
    }
  }
}