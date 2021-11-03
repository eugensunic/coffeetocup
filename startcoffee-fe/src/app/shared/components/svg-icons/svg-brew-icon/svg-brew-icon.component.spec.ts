import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgBrewIconComponent } from './svg-brew-icon.component';

describe('SvgBrewIconComponent', () => {
  let component: SvgBrewIconComponent;
  let fixture: ComponentFixture<SvgBrewIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgBrewIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgBrewIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
