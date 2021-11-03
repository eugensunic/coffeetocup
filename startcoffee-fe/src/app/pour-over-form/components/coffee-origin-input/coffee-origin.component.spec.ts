import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeOriginComponent } from './coffee-origin.component';

describe('CoffeeOriginComponent', () => {
  let component: CoffeeOriginComponent;
  let fixture: ComponentFixture<CoffeeOriginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeOriginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeOriginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
