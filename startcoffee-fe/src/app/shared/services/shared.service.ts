import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private subjectStepIndex = new Subject<number>();
  private subjectSearch = new Subject<any>();
  private subjectSpinner = new Subject<any>();
  private countryFilteredData = new Subject<any>();
  private deleteCoffeeSubject = new Subject<any>();
  private lastBrewDateSmSort = new Subject<any>();
  private lastBrewDateLgSort = new Subject<any>();
  private avgOverallSmSort = new Subject<any>();
  private avgOverallLgSort = new Subject<any>();
  private totalBrewsSmSort = new Subject<any>();
  private totalBrewsLgSort = new Subject<any>();

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  // sort subjects begin

  sendSmLastBrewDateSort() {
    this.lastBrewDateSmSort.next();
  }

  getSmLastBrewDateSort() {
    return this.lastBrewDateSmSort.asObservable();
  }

  sendLgLastBrewDateSort() {
    this.lastBrewDateLgSort.next();
  }

  getLgLastBrewDateSort() {
    return this.lastBrewDateLgSort.asObservable();
  }

  sendSmAvgOverallSort() {
    this.avgOverallSmSort.next();
  }

  getSmAvgOverallSort() {
    return this.avgOverallSmSort.asObservable();
  }

  sendLgAvgOverallSort() {
    this.avgOverallLgSort.next();
  }

  getLgAvgOverallSort() {
    return this.avgOverallLgSort.asObservable();
  }

  sendSmTotalBrewsSort() {
    this.totalBrewsSmSort.next();
  }

  getSmTotalBrewsSort() {
    return this.totalBrewsSmSort.asObservable();
  }

  sendLgTotalBrewsSort() {
    this.totalBrewsLgSort.next();
  }

  getLgTotalBrewsSort() {
    return this.totalBrewsLgSort.asObservable();
  }

  // sort subjects end

  getImage(url: string): Observable<any> {
    return this.http.get(url);
  }

  generateCoffeeUrl(url: string, params: any): Observable<any> {
    return this.http.post<any>(url, params);
  }

  sendDeleteCoffee(coffeeList: any) {
    this.deleteCoffeeSubject.next(coffeeList);
  }

  getDeletedCoffee() {
    return this.deleteCoffeeSubject.asObservable();
  }

  setActiveStepIndex(index) {
    this.subjectStepIndex.next(index);
  }

  getActiveStepIndex() {
    return this.subjectStepIndex.asObservable();
  }

  setBackgroundImage(path) {
    document.querySelector('body').style.backgroundImage = `url(${path})`;
  }

  // unused method
  sanitizeImage(res: Blob) {
    return this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(res));
  }
  /* comparison functions (number, string, date, object)
     compareNum2 adds an extra parameters since we look
     inside an object and have to retrieve its property
     Order Types: ASC, DESC
     DEFAULT ORDER IS ASCENDING
  */

  compareNum1(paramName: string, orderType: 'ASC' | 'DESC'): (a: string, b: string) => number {
    return (a, b) => {
      if (parseFloat(a[paramName]) < parseFloat(b[paramName])) {
        return orderType === 'ASC' ? -1 : 1;
      }
      if (parseFloat(a[paramName]) > parseFloat(b[paramName])) {
        return orderType === 'ASC' ? 1 : -1;
      }
      return 0;
    };
  }

  compareString(paramName: string, orderType: 'ASC' | 'DESC'): (a: string, b: string) => number {
    return (a, b) => {
      if (a[paramName].toUpperCase() < b[paramName].toUpperCase()) {
        return orderType === 'ASC' ? -1 : 1;
      }
      if (a[paramName].toUpperCase() > b[paramName].toUpperCase()) {
        return orderType === 'ASC' ? 1 : -1;
      }
      return 0;
    };
  }

  // without property just array of dates
  compareDateSimple(orderType: 'ASC' | 'DESC'): (a: string, b: string) => number {
    return (a, b) => {
      if (Date.parse(a) < Date.parse(b)) {
        return orderType === 'ASC' ? -1 : 1;
      }
      if (Date.parse(a) > Date.parse(b)) {
        return orderType === 'ASC' ? 1 : -1;
      }
      return 0;
    };
  }

  // with property
  compareDate(paramName: string, orderType: 'ASC' | 'DESC'): (a: string, b: string) => number {
    return (a, b) => {
      if (!a[paramName]) {
        return 1;
      }
      if (!b[paramName]) {
        return -1;
      }
      if (Date.parse(a[paramName]) < Date.parse(b[paramName])) {
        return orderType === 'ASC' ? -1 : 1;
      }
      if (Date.parse(a[paramName]) > Date.parse(b[paramName])) {
        return orderType === 'ASC' ? 1 : -1;
      }
      return 0;
    };
  }

  // number property value inside an object
  compareNum2(
    paramName: string,
    extraParam: string,
    orderType: 'ASC' | 'DESC'
  ): (a: string, b: string) => number {
    return (a, b) => {
      if (parseFloat(a[paramName][extraParam]) < parseFloat(b[paramName][extraParam])) {
        return orderType === 'ASC' ? -1 : 1;
      }
      if (parseFloat(a[paramName][extraParam]) > parseFloat(b[paramName][extraParam])) {
        return orderType === 'ASC' ? 1 : -1;
      }
      return 0;
    };
  }

  sendSearchUserSignal(data) {
    this.subjectSearch.next(data);
  }

  getSearchUserSignal(): Observable<any> {
    return this.subjectSearch.asObservable();
  }

  sendCountryFilteredData(objValue) {
    this.countryFilteredData.next(objValue);
  }

  getCountryFilteredData(): Observable<any> {
    return this.countryFilteredData.asObservable();
  }

  sendLoadingSpinnerSignal(data: boolean) {
    this.subjectSpinner.next(data);
  }

  loadingSpinner(): Observable<any> {
    return this.subjectSpinner.asObservable();
  }

  roastingTypeNameMapping(name) {
    if (name === 'light') {
      return 'Light';
    }
    if (name === 'medium') {
      return 'Medium';
    }
    if (name === 'dark') {
      return 'Dark';
    }
    return name;
  }

  processingTypeNameMapping(name) {
    if (name === 'process-washed') {
      return 'Washed';
    }
    if (name === 'process-natural') {
      return 'Natural';
    }
    if (name === 'process-hybrid') {
      return 'Hybrid';
    }
    return name;
  }

  tastingValuesToPercentage(obj): any {
    return {
      acidity: ((obj.acidity / 10) * 100).toFixed(0) + '%',
      bitterness: ((obj.bitterness / 10) * 100).toFixed(0) + '%',
      sweetness: ((obj.sweetness / 10) * 100).toFixed(0) + '%',
      intensity: ((obj.intensity / 10) * 100).toFixed(0) + '%',
    };
  }

  applyColorOnClick(htmlElements, ...params) {
    for (let i = 0; i < params.length; i++) {
      htmlElements[i].nativeElement.style.color = params[i];
      htmlElements[i].nativeElement.style.fontWeight = params[i] ? 'bold' : null;
    }
  }

  applyBackgroundColorOnClick(htmlElements, ...params) {
    for (let i = 0; i < params.length; i++) {
      htmlElements[i].nativeElement.style.backgroundColor = params[i];
    }
  }

  applyBorderBottomOnClick(htmlElements, ...params) {
    for (let i = 0; i < params.length; i++) {
      htmlElements[i].nativeElement.style.borderBottom = params[i];
    }
  }

  scrollIntoValidationView() {
    // rgb(220, 53, 69) equals to #dc3545 is red color
    const list = document.querySelectorAll('.heading-label');
    for (let i = 0; i < list.length; i++) {
      let element = list[i];
      const elementColor = window.getComputedStyle(list[i]).color;
      if (elementColor === 'rgb(220, 53, 69)') {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      }
    }
  }

  scrollToPageTopView() {
    document.getElementById('angular-header-navbar').scrollIntoView();
  }

  highlightNavHeading(name: string): void {
    this.clearAllStylesNavElements();
    const navElement = document.querySelector(`[routerlink="/${name}"]`) as HTMLElement;
    if (navElement) {
      navElement.style.fontWeight = '600';
      navElement.style.textDecoration = 'underline';
    }
  }
  clearAllStylesNavElements() {
    const list = document.querySelectorAll('[routerlink]') as any;
    list.forEach((element) => {
      element.style.fontWeight = '400';
      element.style.textDecoration = 'none';
    });
  }
}
