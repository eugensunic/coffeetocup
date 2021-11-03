import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgSecondStepSmComponent } from './svg-second-step-sm.component';

describe('SvgSecondStepSmComponent', () => {
  let component: SvgSecondStepSmComponent;
  let fixture: ComponentFixture<SvgSecondStepSmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgSecondStepSmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgSecondStepSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
