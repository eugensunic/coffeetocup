import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgFloralFlavorComponent } from './svg-floral-flavor.component';

describe('SvgFloralFlavorComponent', () => {
  let component: SvgFloralFlavorComponent;
  let fixture: ComponentFixture<SvgFloralFlavorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgFloralFlavorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgFloralFlavorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
