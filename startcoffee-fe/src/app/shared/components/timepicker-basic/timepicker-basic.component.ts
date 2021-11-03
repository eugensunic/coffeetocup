import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DateTimePickerService } from '../../services/date-time-picker.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-timepicker-basic',
  templateUrl: './timepicker-basic.component.html',
})
export class TimepickerBasicComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  @Input() time;
  @Input() className;

  constructor(private dateTimePickerService: DateTimePickerService) {
  }

  ngOnInit() {
    this.removeHoursInputBox();
  }

  onTimeChange(event) {
    this.dateTimePickerService.sendMinutesSeconds(event);
  }

  removeHoursInputBox() {
    document.getElementsByClassName('ngb-tp-hour')[0].remove();
    document.getElementsByClassName('ngb-tp-spacer')[0].remove();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
