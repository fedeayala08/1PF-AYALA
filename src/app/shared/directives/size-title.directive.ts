import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appSizeTitle]'
})
export class SizeTitleDirective implements OnChanges{

@Input()
 appSizeTitle= '20px';

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.setZiseTitle();
  }

  setZiseTitle(): void {
     this.renderer2.setStyle(
       this.elementRef.nativeElement,
       'font-size',
       this.appSizeTitle
     );

  }

}
