import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgFlavorAndCommentsUpReducedComponent } from './svg-flavor-and-comments-up-reduced.component';

describe('SvgFlavorAndCommentsUpReducedComponent', () => {
  let component: SvgFlavorAndCommentsUpReducedComponent;
  let fixture: ComponentFixture<SvgFlavorAndCommentsUpReducedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgFlavorAndCommentsUpReducedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgFlavorAndCommentsUpReducedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
