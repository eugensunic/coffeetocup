import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgThirdStepSmComponent } from './svg-third-step-sm.component';

describe('SvgThirdStepSmComponent', () => {
  let component: SvgThirdStepSmComponent;
  let fixture: ComponentFixture<SvgThirdStepSmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgThirdStepSmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgThirdStepSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
