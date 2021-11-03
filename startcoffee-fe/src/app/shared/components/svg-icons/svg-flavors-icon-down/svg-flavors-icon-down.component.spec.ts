import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgFlavorsIconDownComponent } from './svg-flavors-icon-down.component';

describe('SvgFlavorsIconDownComponent', () => {
  let component: SvgFlavorsIconDownComponent;
  let fixture: ComponentFixture<SvgFlavorsIconDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgFlavorsIconDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgFlavorsIconDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
