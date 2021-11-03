import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgGuidelinesDownComponent } from './svg-guidelines-down.component';

describe('SvgGuidelinesDownComponent', () => {
  let component: SvgGuidelinesDownComponent;
  let fixture: ComponentFixture<SvgGuidelinesDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgGuidelinesDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgGuidelinesDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
