import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgCheckAddCommentsDownComponent } from './svg-check-add-comments-down.component';

describe('SvgCheckAddCommentsDownComponent', () => {
  let component: SvgCheckAddCommentsDownComponent;
  let fixture: ComponentFixture<SvgCheckAddCommentsDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgCheckAddCommentsDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgCheckAddCommentsDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
