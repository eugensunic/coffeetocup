import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoffeesService {
  constructor(private http: HttpClient) {}

  // GET
  getAllUsersMetaData(url: string, params?: any): Observable<any> {
    return this.http.get<any>(url, params);
  }

  getAllUsersCoffeeData(url: string, params?: any): Observable<any> {
    return this.http.get<any>(url, params);
  }

  waitForStoreToFill(source: Observable<any>): Observable<any> {
    return source.pipe(filter(x => !!x.coffees && !!x.users));
  }
}
