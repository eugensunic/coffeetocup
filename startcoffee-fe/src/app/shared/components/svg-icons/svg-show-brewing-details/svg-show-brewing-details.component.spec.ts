import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgShowBrewingDetailsComponent } from './svg-show-brewing-details.component';

describe('SvgShowBrewingDetailsComponent', () => {
  let component: SvgShowBrewingDetailsComponent;
  let fixture: ComponentFixture<SvgShowBrewingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgShowBrewingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgShowBrewingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
