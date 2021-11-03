import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgBrewingDetailsUpComponent } from './svg-brewing-details-up.component';

describe('SvgBrewingDetailsUpComponent', () => {
  let component: SvgBrewingDetailsUpComponent;
  let fixture: ComponentFixture<SvgBrewingDetailsUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgBrewingDetailsUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgBrewingDetailsUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
