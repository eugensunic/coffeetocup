import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgThirdStepComponent } from './svg-third-step.component';

describe('SvgThirdStepComponent', () => {
  let component: SvgThirdStepComponent;
  let fixture: ComponentFixture<SvgThirdStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgThirdStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgThirdStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
