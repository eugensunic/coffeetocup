import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgSecondStepComponent } from './svg-second-step.component';

describe('SvgSecondStepComponent', () => {
  let component: SvgSecondStepComponent;
  let fixture: ComponentFixture<SvgSecondStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgSecondStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgSecondStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
