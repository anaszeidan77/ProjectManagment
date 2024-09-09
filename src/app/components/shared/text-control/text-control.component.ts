import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-text-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-control.component.html',
  styleUrl: './text-control.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextControlComponent),
      multi: true
    }
  ]
})
export class TextControlComponent implements ControlValueAccessor {

  @Input() type: string = 'text';
  @Input() id!: string;
  @Input() name!: string;
  @Input() class!: string;
  @Input() btnClass: string = '';
  @Input() placeholder!: string;
  @Input() ariaLabel!: string;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() minlength!: number;
  @Input() maxlength!: number;
  @Input() value:string='';
  @Input() width:string='';
  @Input() height:string='';

  @Input() color: string = ''; 
  @Input() backgroundColor: string = '';
  @Input() border: string = '';
  @Input() borderRadius: string = '';

  @Output() clickEvent = new EventEmitter<Event>();
  @Output() focusChange = new EventEmitter<Event>();
  @Output() blurChange = new EventEmitter<Event>();



  //lable
  @Input() labelFor!: string;
  @Input() labelId!: string;
  @Input() labelClass: string = '';
  @Input() labelColor: string = '';
  @Input() labelBackgroundColor: string = '';
  @Input() labelFontSize: string = '';
  @Input() labelFontWeight: string = '';
  @Input() labelMargin: string = '';
  @Input() labelPadding: string = '';
  @Input() labelTextAlign: string = '';
  @Input() labelText: string = '';




  // Icon 
  @Input() iconName: string = ''; 
  @Input() iconColor: string = '';
  @Input() iconSize: string = '24px'; 
  @Input() iconClass: string = '';
  @Input() iconPosition = '';//'left' , 'right'

  
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Update value when input changes
  onInputChange(event: any): void {
    const value = event.target.value;
    this.onChange(value);
    this.onTouched();
  }

  onClick(event: Event): void {
    this.clickEvent.emit(event);
  }

  onFocus(event: Event): void {
    this.focusChange.emit(event);
  }

  onBlur(event: Event): void {
    this.blurChange.emit(event);
  }
}


