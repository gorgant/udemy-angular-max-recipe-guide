import { 
  Directive, 
  OnInit,
  ElementRef,
  Renderer2,
  HostListener,
  HostBinding,
  Input 
} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {

  open = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
  }

  @HostListener('click') click(eventData: Event){
    
    if(this.open) {
      this.renderer.removeClass(this.elRef.nativeElement, 'open');  
    }
    else {
      this.renderer.addClass(this.elRef.nativeElement, 'open');
    }
    this.open = !this.open;
  }
}
