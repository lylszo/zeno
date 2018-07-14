import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
	selector: '[appDemo]'
})
export class DemoDirective {

	constructor(private el:ElementRef) {
	}

	@HostListener('click') onClick() {
		console.log($('.error').find('span'));
	}

}
