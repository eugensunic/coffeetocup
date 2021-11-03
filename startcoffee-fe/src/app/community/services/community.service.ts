import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  constructor(private http: HttpClient) {}

  // GET
  getGeneralStats(url: string, params?: any): Observable<any> {
    return this.http.get<any>(url, params);
  }

  getMostCoffeesStats(url: string, params?: any): Observable<any> {
    return this.http.get<any>(url, params).pipe(
      map((x: any) =>
        x.map(y => ({
          ...y,
          location: this.parseLocation(y.location)
        }))
      )
    );
  }

  getMostBrewsStats(url: string, params?: any): Observable<any> {
    return this.http.get<any>(url, params).pipe(
      map((x: any) =>
        x.map(y => ({
          ...y,
          location: this.parseLocation(y.location)
        }))
      )
    );
  }

  parseLocation(location: string): string {
    const EMTPY_STRING = '';
    if (!location) {
      return EMTPY_STRING;
    }

    let [country, city] = location.split(',');
    country = country.trim().indexOf('null') > -1 ? EMTPY_STRING : country;
    city = city.trim().indexOf('null') > -1 ? EMTPY_STRING : city;

    return country.concat(city);
  }
}
