import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgNuttyFlavorComponent } from './svg-nutty-flavor.component';

describe('SvgNuttyFlavorComponent', () => {
  let component: SvgNuttyFlavorComponent;
  let fixture: ComponentFixture<SvgNuttyFlavorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgNuttyFlavorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgNuttyFlavorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
