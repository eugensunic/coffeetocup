import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedCoffeeStatisticsComponent } from './shared-coffee-statistics.component';

describe('SharedCoffeeStatisticsComponent', () => {
  let component: SharedCoffeeStatisticsComponent;
  let fixture: ComponentFixture<SharedCoffeeStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedCoffeeStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedCoffeeStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
