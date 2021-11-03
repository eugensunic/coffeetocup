import { DateTimePickerService } from '../../services/date-time-picker.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
})
export class DatePickerComponent implements OnInit, OnDestroy {
  model;
  private ngUnsubscribe = new Subject();
  currentDate = new Date();
  maxDate;

  constructor(private dateTimePickerService: DateTimePickerService) {
    this.maxDate = {
      year: this.currentDate.getFullYear(),
      month: this.currentDate.getMonth() + 1,
      day: this.currentDate.getDate(),
    };
    // doesn't work on ngOnInit should add ngZone apparently
    this.dateTimePickerService
      .getDateTime()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (x) => {
          this.model = x;
        },
        (err) => {}
      );
  }

  ngOnInit() {}

  changeDateTime(event: any) {
    this.dateTimePickerService.sendDateTime(event);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
