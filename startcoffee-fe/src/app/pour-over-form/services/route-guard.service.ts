import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class RouteGuardService {
  private subject = new BehaviorSubject<boolean>(false);

  canNavigateToForm(canNavigate: boolean) {
    this.subject.next(canNavigate);
  }

  shouldNavigateToForm(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
