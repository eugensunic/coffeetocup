import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgFlavorAndCommentsUpComponent } from './svg-flavor-and-comments-up.component';

describe('SvgFlavorAndCommentsUpComponent', () => {
  let component: SvgFlavorAndCommentsUpComponent;
  let fixture: ComponentFixture<SvgFlavorAndCommentsUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgFlavorAndCommentsUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgFlavorAndCommentsUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
