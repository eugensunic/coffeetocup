import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgChocoFlavorComponent } from './svg-choco-flavor.component';

describe('SvgChocoFlavorComponent', () => {
  let component: SvgChocoFlavorComponent;
  let fixture: ComponentFixture<SvgChocoFlavorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgChocoFlavorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgChocoFlavorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
