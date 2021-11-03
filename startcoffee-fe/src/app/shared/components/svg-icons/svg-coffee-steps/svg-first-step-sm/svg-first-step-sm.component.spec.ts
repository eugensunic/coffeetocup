import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgFirstStepSmComponent } from './svg-first-step-sm.component';

describe('SvgFirstStepSmComponent', () => {
  let component: SvgFirstStepSmComponent;
  let fixture: ComponentFixture<SvgFirstStepSmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgFirstStepSmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgFirstStepSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
