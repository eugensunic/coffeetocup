import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgSortIconComponent } from './svg-sort-icon.component';

describe('SvgSortIconComponent', () => {
  let component: SvgSortIconComponent;
  let fixture: ComponentFixture<SvgSortIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgSortIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgSortIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
