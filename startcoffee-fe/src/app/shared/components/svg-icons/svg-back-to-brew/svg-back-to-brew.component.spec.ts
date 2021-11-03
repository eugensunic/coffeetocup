import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgBackToBrewComponent } from './svg-back-to-brew.component';

describe('SvgBackToBrewComponent', () => {
  let component: SvgBackToBrewComponent;
  let fixture: ComponentFixture<SvgBackToBrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgBackToBrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgBackToBrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
