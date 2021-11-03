import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MostBrewsAddedComponent } from './most-brews-added.component';

describe('MostBrewsAddedComponent', () => {
  let component: MostBrewsAddedComponent;
  let fixture: ComponentFixture<MostBrewsAddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MostBrewsAddedComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostBrewsAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
