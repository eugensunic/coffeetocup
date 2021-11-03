import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgFruityFlavorComponent } from './svg-fruity-flavor.component';

describe('SvgFruityFlavorComponent', () => {
  let component: SvgFruityFlavorComponent;
  let fixture: ComponentFixture<SvgFruityFlavorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgFruityFlavorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgFruityFlavorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
