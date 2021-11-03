import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgCaramelFlavorComponent } from './svg-caramel-flavor.component';

describe('SvgCaramelFlavorComponent', () => {
  let component: SvgCaramelFlavorComponent;
  let fixture: ComponentFixture<SvgCaramelFlavorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgCaramelFlavorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgCaramelFlavorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
