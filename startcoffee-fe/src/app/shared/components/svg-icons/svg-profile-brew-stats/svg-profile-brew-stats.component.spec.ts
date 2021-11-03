import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgProfileBrewStatsComponent } from './svg-profile-brew-stats.component';

describe('SvgProfileBrewStatsComponent', () => {
  let component: SvgProfileBrewStatsComponent;
  let fixture: ComponentFixture<SvgProfileBrewStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgProfileBrewStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgProfileBrewStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
