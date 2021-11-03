import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgChartIconComponent } from './svg-chart-icon.component';

describe('SvgChartIconComponent', () => {
  let component: SvgChartIconComponent;
  let fixture: ComponentFixture<SvgChartIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgChartIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgChartIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
