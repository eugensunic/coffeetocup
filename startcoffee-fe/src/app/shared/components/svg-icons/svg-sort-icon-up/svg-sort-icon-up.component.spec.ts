import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgSortIconUpComponent } from './svg-sort-icon-up.component';

describe('SvgSortIconUpComponent', () => {
  let component: SvgSortIconUpComponent;
  let fixture: ComponentFixture<SvgSortIconUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgSortIconUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgSortIconUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
