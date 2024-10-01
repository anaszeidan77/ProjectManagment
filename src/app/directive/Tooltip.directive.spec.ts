/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { TooltipDirective } from './Tooltip.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('Directive: Tooltip', () => {
  let directive: TooltipDirective;
  let elRef: ElementRef;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ElementRef, useValue: new ElementRef(null) }, // Mock ElementRef
        Renderer2 // Renderer2 is automatically provided by Angular
      ]
    });

    elRef = TestBed.inject(ElementRef);
    renderer = TestBed.inject(Renderer2);
    directive = new TooltipDirective(elRef, renderer); // Pass the required dependencies
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
