import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingWrapperComponent } from './sorting-wrapper.component';

describe('SortingWrapperComponent', () => {
  let component: SortingWrapperComponent;
  let fixture: ComponentFixture<SortingWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortingWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
