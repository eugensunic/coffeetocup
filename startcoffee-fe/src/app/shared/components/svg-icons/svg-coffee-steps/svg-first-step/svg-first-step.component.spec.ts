import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgFirstStepComponent } from './svg-first-step.component';

describe('SvgFirstStepComponent', () => {
  let component: SvgFirstStepComponent;
  let fixture: ComponentFixture<SvgFirstStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgFirstStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgFirstStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
