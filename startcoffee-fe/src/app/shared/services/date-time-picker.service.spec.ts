import { TestBed, inject } from '@angular/core/testing';
import { DateTimePickerService } from './date-time-picker.service';

describe('DateTimePickerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateTimePickerService]
    });
  });

  it('should be created', inject([DateTimePickerService], (service: DateTimePickerService) => {
    expect(service).toBeTruthy();
  }));
});
