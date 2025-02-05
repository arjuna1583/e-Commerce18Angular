import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]',
  standalone: true,
})
export class NumberOnlyDirective {
  
  constructor(private _el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue = this._el.nativeElement.value;
    if (initalValue === 0) {
      this._el.nativeElement.value = '';
    } else {
      this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
      if (initalValue !== this._el.nativeElement.value) {
        event.stopPropagation();
      }
    }
  }
}
