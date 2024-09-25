import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shared-modal',
  standalone: true,
  imports: [],
  templateUrl: './shared-modal.component.html',
  styleUrl: './shared-modal.component.css'
})
export class SharedModalComponent {
  @Input() title: string = 'Modal';
  @Input() message: string = 'هل أنت متأكد من الإجراء؟';
  @Input() showCancelButton: boolean = true;
  @Input() confirmButtonText: string = 'تأكيد';
  @Input() cancelButtonText: string = 'إلغاء';

  @Output() confirm = new EventEmitter<void>();

  constructor(public activeModal: NgbActiveModal) {}

  onConfirm() {
    this.confirm.emit();
    this.activeModal.close('confirm');
  }

  onCancel() {
    this.activeModal.dismiss('cancel');
  }
}
