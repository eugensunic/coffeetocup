import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgBackToOriginListComponent } from './svg-back-to-origin-list.component';

describe('SvgBackToOriginListComponent', () => {
  let component: SvgBackToOriginListComponent;
  let fixture: ComponentFixture<SvgBackToOriginListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgBackToOriginListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgBackToOriginListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
