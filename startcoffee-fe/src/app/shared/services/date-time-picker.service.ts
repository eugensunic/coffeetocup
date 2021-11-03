import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateTimePickerService {
  private subjectDateTime = new BehaviorSubject<any>({ year: 0, month: 0, day: 0 });
    private subjectMinutesSeconds = new Subject<any>();

    constructor() {}

    // dateTime
    sendDateTime(message: any) {
      this.subjectDateTime.next(message);
    }

    getDateTime(): Observable<any> {
      return this.subjectDateTime.asObservable();
    }

    // hoursMinutes
    sendMinutesSeconds(message: any) {
      this.subjectMinutesSeconds.next(message);
    }

    getMinutesSeconds(): Observable<any> {
      return this.subjectMinutesSeconds.asObservable();
    }
}
