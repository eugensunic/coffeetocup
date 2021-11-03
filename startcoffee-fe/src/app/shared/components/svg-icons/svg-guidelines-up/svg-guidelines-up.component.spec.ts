import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgGuidelinesUpComponent } from './svg-guidelines-up.component';

describe('SvgGuidelinesUpComponent', () => {
  let component: SvgGuidelinesUpComponent;
  let fixture: ComponentFixture<SvgGuidelinesUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgGuidelinesUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgGuidelinesUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
