import { TestBed } from '@angular/core/testing';

import { CoffeesService } from './coffees.service';

describe('CoffeesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoffeesService = TestBed.get(CoffeesService);
    expect(service).toBeTruthy();
  });
});
