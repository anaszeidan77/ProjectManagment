import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {

  @Input('appTooltip') tooltipText: string = '';
  tooltipElement!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
  }

  private createTooltip() {
    if (!this.tooltipElement) {
      this.tooltipElement = this.renderer.createElement('span');
      this.renderer.addClass(this.tooltipElement, 'tooltip-custom');
      this.renderer.setProperty(this.tooltipElement, 'textContent', this.tooltipText);
      this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
      this.renderer.setStyle(this.tooltipElement, 'background-color', 'black');
      this.renderer.setStyle(this.tooltipElement, 'color', 'white');
      this.renderer.setStyle(this.tooltipElement, 'padding', '5px 10px');
      this.renderer.setStyle(this.tooltipElement, 'border-radius', '5px');
      this.renderer.setStyle(this.tooltipElement, 'top', `${this.el.nativeElement.offsetTop + this.el.nativeElement.offsetHeight + 5}px`);
      this.renderer.setStyle(this.tooltipElement, 'left', `${this.el.nativeElement.offsetLeft}px`);
      this.renderer.appendChild(document.body, this.tooltipElement);
    }
  }

  private showTooltip() {
    if (!this.tooltipElement) {
      this.createTooltip();
    }
    this.renderer.setStyle(this.tooltipElement, 'visibility', 'visible');
  }

  private hideTooltip() {
    if (this.tooltipElement) {
      this.renderer.setStyle(this.tooltipElement, 'visibility', 'hidden');
    }
  }

}