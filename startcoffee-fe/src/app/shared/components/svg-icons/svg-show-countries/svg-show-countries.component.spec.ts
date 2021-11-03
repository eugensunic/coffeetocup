import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgShowCountriesComponent } from './svg-show-countries.component';

describe('SvgShowCountriesComponent', () => {
  let component: SvgShowCountriesComponent;
  let fixture: ComponentFixture<SvgShowCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgShowCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgShowCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
