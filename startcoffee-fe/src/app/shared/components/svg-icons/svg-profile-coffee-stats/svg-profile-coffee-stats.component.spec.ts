import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgProfileCoffeeStatsComponent } from './svg-profile-coffee-stats.component';

describe('SvgProfileCoffeeStatsComponent', () => {
  let component: SvgProfileCoffeeStatsComponent;
  let fixture: ComponentFixture<SvgProfileCoffeeStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgProfileCoffeeStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgProfileCoffeeStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
