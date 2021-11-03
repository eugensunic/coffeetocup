import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MostCoffeesAddedComponent } from './most-coffees-added.component';

describe('MostCoffeesAddedComponent', () => {
  let component: MostCoffeesAddedComponent;
  let fixture: ComponentFixture<MostCoffeesAddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostCoffeesAddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostCoffeesAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
