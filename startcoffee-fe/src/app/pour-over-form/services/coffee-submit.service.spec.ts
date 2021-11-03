import { TestBed, inject } from '@angular/core/testing';
import { CoffeeSubmitService } from './coffee-submit.service';

describe('CoffeeOriginSubmitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoffeeSubmitService]
    });
  });

  it('should be created', inject([CoffeeSubmitService], (service: CoffeeSubmitService) => {
    expect(service).toBeTruthy();
  }));
});
