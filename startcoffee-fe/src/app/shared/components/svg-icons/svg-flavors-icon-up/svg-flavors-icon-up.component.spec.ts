import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgFlavorsIconUpComponent } from './svg-flavors-icon-up.component';

describe('SvgFlavorsIconUpComponent', () => {
  let component: SvgFlavorsIconUpComponent;
  let fixture: ComponentFixture<SvgFlavorsIconUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgFlavorsIconUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgFlavorsIconUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
