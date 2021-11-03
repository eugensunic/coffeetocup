import { ConfirmedPasswordModel } from '../models/confirmed-password.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ChangePasswordModel } from 'src/app/core-global-elements/components/change-password/change-password.model';
import { getCurrentDateTimeString } from 'src/app/utils';

@Injectable()
export class LoginService {
  private subjectLoginStatus = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  // sendLoginData(url: string, params: LoginModel): Observable<any> {
  //   return this.http.post<any>(url, params);
  // }

  sendCurrentPassword(url: string, params: ConfirmedPasswordModel): Observable<any> {
    return this.http.post(url, params);
  }

  changePassword(url: string, params: ChangePasswordModel): Observable<any> {
    return this.http.post(url, params);
  }

  getUserSettings(url: string, params?: any): Observable<any> {
    return this.http.get<any>(url, params);
  }

  sendGdprModalConfirmation(url: string, params: any): Observable<any> {
    return this.http.post<any>(url, params);
  }

  logout() {
    return fetch('/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loggedOutTime: getCurrentDateTimeString() }),
    });
  }

  // dateTime
  sendLoginConfirmationStatus(loggedIn: any) {
    this.subjectLoginStatus.next(loggedIn);
  }

  getLoginConfirmationStatus(): Observable<boolean> {
    return this.subjectLoginStatus.asObservable();
  }
}
