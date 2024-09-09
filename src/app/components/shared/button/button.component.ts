import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() id!: string;
  @Input() name!: string;
  @Input() class!: string;
  @Input() bootstrapClass: string = '';
  @Input() type: string = '';
  @Input() label: string = '';
  @Input() disabled: boolean = false;


  @Input() color: string = ''; 
  @Input() backgroundColor: string = '';
  @Input() border: string = '';
  @Input() borderRadius: string = '';

  @Output() btnClick = new EventEmitter<Event>();

  onClick(event: Event): void {
    this.btnClick.emit(event);
  }
}


