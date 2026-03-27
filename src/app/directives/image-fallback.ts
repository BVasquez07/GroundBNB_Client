import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: 'img[appImageFallback]',
  standalone: true
})
export class ImageFallbackDirective {
  @Input() appImageFallback: string = "/assets/house3.jpg";

  constructor(private eRef: ElementRef) {}

  @HostListener('error')
  loadFallback() {
    const element: HTMLImageElement = this.eRef.nativeElement;

    // Prevent a retry loop if the fallback image also fails.
    if (element.dataset["fallbackApplied"] === "true") {
      return;
    }

    element.dataset["fallbackApplied"] = "true";
    element.src = this.appImageFallback;
  }
}
