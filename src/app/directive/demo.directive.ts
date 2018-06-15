import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDemo]'
})
export class DemoDirective {
  span: any;

  constructor(public renderer: Renderer2, public el:ElementRef) {
  	console.dir(this.el);
  	const span = this.renderer.createElement('span');
	const text = this.renderer.createText('Click here to add span');
	  // this.renderer.appendChild(span, text);
	  this.renderer.appendChild(this.el.nativeElement, span);
  }

}
