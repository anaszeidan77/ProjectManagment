import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent{
//   constructor() {}

//   @Input() title: string = '';
//   @Input() body: string = '';
//   @Output() closeMeEvent = new EventEmitter();
//   @Output() confirmEvent = new EventEmitter();
//   ngOnInit(): void {
//     console.log('Modal init');
//   }

//   closeMe() {
//     this.closeMeEvent.emit();
//   }
//   confirm() {
//     this.confirmEvent.emit();
//   } 

//  ngOnDestroy(): void {
//     console.log(' Modal destroyed');
//   }


@Input() title: string = '';
@Input() bodyTemplate!: TemplateRef<any>;
@Input() buttons: any[] = [];
@Input() data: any = {};

@Output() closeMeEvent = new EventEmitter<void>();
@Output() confirmEvent = new EventEmitter<string>();

onAction(action: string) {
  if (action === 'cancel') {
    this.closeMeEvent.emit();
  } else {
    this.confirmEvent.emit(action);
  }
}
}
