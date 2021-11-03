import { DeleteBrewAttributePostModel } from '../models/delete-coffee-post.model';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ArchiveCoffeePostModel } from 'src/app/user-profile/models/archive-coffee-post.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private subjectUniqueCountry = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {}

  // GET
  getUserData(url: string, params?: any): Observable<any> {
    return this.http.get<any>(url, params);
  }

  getUserSettingsData(url: string, params?: any): Observable<any> {
    return this.http.get<any>(url, params);
  }

  getUserProfileData(url: string, params?: any): Observable<any> {
    return this.http.get<any>(url, params);
  }

  // POST DELETE
  deleteCoffeeOriginBrewAttributesData(url: string, params: DeleteBrewAttributePostModel): Observable<any> {
    return this.http.post<any>(url, params);
  }

  deleteCoffeeEntireOriginData(url: string, params: ArchiveCoffeePostModel): Observable<any> {
    return this.http.post<any>(url, params);
  }

  // POST ARCHIVE
  archiveCoffeeData(url: string, params: ArchiveCoffeePostModel): Observable<any> {
    return this.http.post<any>(url, params);
  }

  getArchivesLength(params: any): Observable<any> {
    return this.http.get<any>('/api/coffee/archive/amount', params);
  }

  // transferring data to country section
  transferUniqueCountryData(data) {
    this.subjectUniqueCountry.next(data);
  }

  getUniqueCountryData(): Observable<any> {
    return this.subjectUniqueCountry.asObservable();
  }
}
