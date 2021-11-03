import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgBrewingDetailsComponent } from './svg-brewing-details.component';

describe('SvgBrewingDetailsComponent', () => {
  let component: SvgBrewingDetailsComponent;
  let fixture: ComponentFixture<SvgBrewingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgBrewingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgBrewingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
