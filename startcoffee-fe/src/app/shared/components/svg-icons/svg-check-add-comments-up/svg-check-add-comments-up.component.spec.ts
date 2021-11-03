import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgCheckAddCommentsUpComponent } from './svg-check-add-comments-up.component';

describe('SvgCheckAddCommentsUpComponent', () => {
  let component: SvgCheckAddCommentsUpComponent;
  let fixture: ComponentFixture<SvgCheckAddCommentsUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgCheckAddCommentsUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgCheckAddCommentsUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
