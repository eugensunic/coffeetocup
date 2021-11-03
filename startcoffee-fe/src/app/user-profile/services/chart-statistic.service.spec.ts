import { TestBed } from '@angular/core/testing';

import { ChartStatisticService } from './chart-statistic.service';

describe('ChartStatisticService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChartStatisticService = TestBed.get(ChartStatisticService);
    expect(service).toBeTruthy();
  });
});
