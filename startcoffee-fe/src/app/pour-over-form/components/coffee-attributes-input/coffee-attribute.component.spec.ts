import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeAttributeComponent } from './coffee-attribute.component';

describe('CoffeeAttributeComponent', () => {
  let component: CoffeeAttributeComponent;
  let fixture: ComponentFixture<CoffeeAttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeAttributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
