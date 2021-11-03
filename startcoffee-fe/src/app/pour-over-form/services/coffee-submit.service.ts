import { CoffeeBrewInputModel } from '../models/form-brew.model';
import { CoffeeOriginInputModel } from '../models/form-origin.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CoffeeAttributeInputModel } from '../models/form-attributes.model';
import { CoffeeOriginUpdateModel } from '../models/update-origin.model';
import { UserSettingsModel } from '../models/user-settings.model';

@Injectable({
  providedIn: 'root'
})
export class CoffeeSubmitService {
  // private subjectUseCoffee = new Subject<any>();
  constructor(private http: HttpClient) {}

  // POST INSERT
  sendCoffeeOriginData(url: string, params: CoffeeOriginInputModel): Observable<any> {
    return this.http.post<any>(url, params);
  }

  updateCoffeeOriginData(url: string, params: CoffeeOriginUpdateModel): Observable<any> {
    return this.http.post<any>(url, params);
  }

  sendCoffeeBrewData(url: string, params: CoffeeBrewInputModel): Observable<any> {
    return this.http.post<any>(url, params);
  }

  sendCoffeeAttributesData(url: string, params: CoffeeAttributeInputModel): Observable<any> {
    return this.http.post<any>(url, params);
  }

  // ORIGIN MODAL only appears if user hasn't confirmed it
  sendOriginModalConfirmation(url: string, params: UserSettingsModel): Observable<any> {
    return this.http.post<any>(url, params);
  }

  // GET
  getCoffeeResult(url: string, params?: any): Observable<any> {
    return this.http.get<any>(url, params);
  }
}
