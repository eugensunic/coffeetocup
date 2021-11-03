import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgPlusIconComponent } from './svg-plus-icon.component';

describe('SvgPlusIconComponent', () => {
  let component: SvgPlusIconComponent;
  let fixture: ComponentFixture<SvgPlusIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgPlusIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgPlusIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
