import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoffeeHorizontalBarComponent } from './coffee-horizontal-bar.component';

describe('CoffeeFlavourBarComponent', () => {
  let component: CoffeeHorizontalBarComponent;
  let fixture: ComponentFixture<CoffeeHorizontalBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoffeeHorizontalBarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeHorizontalBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
