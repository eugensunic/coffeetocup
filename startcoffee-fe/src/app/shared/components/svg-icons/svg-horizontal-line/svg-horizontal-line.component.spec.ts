import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgHorizontalLineComponent } from './svg-horizontal-line.component';

describe('SvgHorizontalLineComponent', () => {
  let component: SvgHorizontalLineComponent;
  let fixture: ComponentFixture<SvgHorizontalLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgHorizontalLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgHorizontalLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
