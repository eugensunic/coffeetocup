import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgDeleteCoffeeIconComponent } from './svg-delete-coffee-icon.component';

describe('SvgDeleteCoffeeIconComponent', () => {
  let component: SvgDeleteCoffeeIconComponent;
  let fixture: ComponentFixture<SvgDeleteCoffeeIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgDeleteCoffeeIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgDeleteCoffeeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
