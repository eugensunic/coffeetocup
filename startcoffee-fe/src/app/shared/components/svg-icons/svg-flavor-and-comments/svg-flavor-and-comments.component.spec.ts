import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgFlavorAndCommentsComponent } from './svg-flavor-and-comments.component';

describe('SvgFlavorAndCommentsComponent', () => {
  let component: SvgFlavorAndCommentsComponent;
  let fixture: ComponentFixture<SvgFlavorAndCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgFlavorAndCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgFlavorAndCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
