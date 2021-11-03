import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeepSessionAliveService {
  // user will be logged out after 5 hours
  private readonly checkSessionInterval = 3600000;
  public readonly SESSION_COUNTER = 'sessioncounter';
  public keepAliveCount: number;
  public interval;

  constructor() {}

  init() {
    this.keepAliveCount = 0;
    this.activateCheckSession();
  }

  activateCheckSession() {
    this.interval = setInterval(() => {
      this.keepAliveCount++;
      if (this.getSessionCounterValue() === 0) {
        this.keepAliveCount = 1;
      }
      
      this.setSessionCounter(this.keepAliveCount);
    }, this.checkSessionInterval);
  }

  getSessionCounterValue(): number {
    return parseInt(localStorage.getItem(this.SESSION_COUNTER), 10);
  }

  setSessionCounter(counter: number): void {
    localStorage.setItem(this.SESSION_COUNTER, counter.toString());
  }
}
