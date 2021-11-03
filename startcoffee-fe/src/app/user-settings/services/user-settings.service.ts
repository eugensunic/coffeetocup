import { BasicSettingsModel } from '../models/basic-settings.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  constructor(private http: HttpClient) {}

  // POST
  sendBasicSettingsData(url: string, params: BasicSettingsModel): Observable<any> {
    return this.http.post<any>(url, params);
  }

  // file.size is expressed in bytes
  uploadProfileImage(url: string, files: any[]): Observable<any> {
    if (files.length > 0) {
      if (
        !files[0].type.includes('png') &&
        !files[0].type.includes('jpg') &&
        !files[0].type.includes('jpeg')
      ) {
        alert('file is not an image');
        return of(null as any);
      } else if (files[0].size / 1024 / 1024 >= 3) {
        alert('Image should be less than 3 MB');
        return of(null as any);
      }
      const formData = new FormData();
      for (const file of files) {
        formData.append('file', file);
      }

      return this.http.post<any>(url, formData);
    }
    return of(null as any);
  }

  deleteProfileImage(url: string): Observable<any> {
    return this.http.post<any>(url, {});
  }

  // still not used
  isFileOfTypeImage(file: any) {}

  isImageSizeOk(file: any, maxSize: number) {
    const sizeInMB = file.size / 1024 / 1024;
    return sizeInMB > maxSize;
  }

  // GET
  deleteAccount(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
