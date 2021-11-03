import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Router } from '@angular/router';
import { KeepSessionAliveService } from './keep-session-alive.service';
import { environment } from 'src/environments/environment';
import { cookieObject } from 'src/app/utils';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private router: Router, private keepSessionAlive: KeepSessionAliveService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const customReq = request.clone({
      headers: request.headers.set(
        this.keepSessionAlive.SESSION_COUNTER,
        this.keepSessionAlive.getSessionCounterValue().toString()
      ),
    });

    return next.handle(customReq).pipe(
      tap((_) => {
        if (this.keepSessionAlive.getSessionCounterValue() < 5) {
          this.keepSessionAlive.setSessionCounter(0);
        }
      }),
      catchError((err: HttpErrorResponse) => {
        console.log('inside angular interceptor');
        let message = '';
        if (this.isServerError500(err.status)) {
          message = 'Server Error, sorry for the inconvenience, try again later';
        } else if (err.status === 401) {
          if (err.error.timeOutOccurred) {
            message = 'Timeout occurred due to inactivity';
            clearInterval(this.keepSessionAlive.interval);
          } else if (!err.error.isLoggedIn) {
            message = 'Please login first';
          }
        } else if (err.status === 403) {
          message = 'Unauthorized to login';
        }
        this.removeErrorMessage();
        this.showErrorMessage(message);
        if (!cookieObject('auth')) {
          this.navigateToLogin();
        }
        return ErrorObservable.create(err);
      })
    );
  }

  isServerError500(errNum: number): boolean {
    return errNum.toString().substring(0, 2) === '50';
  }

  removeErrorMessage(): void {
    // setTimeout(() => {
    //   this.errorHandlingService.notifyErrorComponent(false);
    // }, 3000);
  }

  showErrorMessage(message: string): void {
    // this.errorHandlingService.notifyErrorComponent(true, message);
  }

  navigateToLogin(): void {
    window.location.href = '/';
    window.dispatchEvent(new Event('server_error'));
    // if (environment.production) {
    //   window.location.href = '/';
    //   location.reload();
    // } else {
    //   window.location.href = '/home-page.html';
    // }
  }
}
