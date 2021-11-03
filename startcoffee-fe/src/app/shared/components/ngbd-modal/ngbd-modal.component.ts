import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TimepickerBasicComponent } from '../timepicker-basic/timepicker-basic.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngbd-modal-component',
  templateUrl: './ngbd-modal.component.html',
})
export class NgbdModalComponent {
  name: string;
  content: string;
  leftButtonName: string;
  rightButtonName: string;
  modalButtonLeftColor = '';
  modalButtonRightColor = '';

  extraParam: any;

  // exclusive param, until solution is found on how to append component to modal
  showEditOrigin: false;

  onConfirm: () => void;
  onClose: () => void;

  constructor(public activeModal: NgbActiveModal) {}

  confirm(): void {
    this.onConfirm();
    this.activeModal.dismiss('Cross click');
  }

  close(): void {
    if (this.onClose) {
      this.onClose();
    }
    this.activeModal.dismiss('Cross click');
  }
}
