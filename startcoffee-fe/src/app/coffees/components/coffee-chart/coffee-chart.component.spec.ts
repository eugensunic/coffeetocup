import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeChartComponent } from './coffee-chart.component';

describe('CoffeeChartComponent', () => {
  let component: CoffeeChartComponent;
  let fixture: ComponentFixture<CoffeeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
