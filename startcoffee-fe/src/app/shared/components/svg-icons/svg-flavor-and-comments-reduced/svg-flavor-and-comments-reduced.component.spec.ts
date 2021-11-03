import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgFlavorAndCommentsReducedComponent } from './svg-flavor-and-comments-reduced.component';

describe('SvgFlavorAndCommentsReducedComponent', () => {
  let component: SvgFlavorAndCommentsReducedComponent;
  let fixture: ComponentFixture<SvgFlavorAndCommentsReducedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgFlavorAndCommentsReducedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgFlavorAndCommentsReducedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
