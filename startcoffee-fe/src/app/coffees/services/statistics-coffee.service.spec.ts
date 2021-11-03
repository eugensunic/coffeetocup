import { TestBed } from '@angular/core/testing';
import { StatisticsCoffeeService } from './statistics-coffee.service';


describe('StatisticsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatisticsCoffeeService = TestBed.get(StatisticsCoffeeService);
    expect(service).toBeTruthy();
  });
});
