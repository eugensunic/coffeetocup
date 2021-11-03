import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgDetailsComponent } from './svg-details.component';

describe('SvgDetailsComponent', () => {
  let component: SvgDetailsComponent;
  let fixture: ComponentFixture<SvgDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
