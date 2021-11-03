import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrewingProcessComponent } from './brewing-process.component';

describe('BrewingProcessComponent', () => {
  let component: BrewingProcessComponent;
  let fixture: ComponentFixture<BrewingProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrewingProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrewingProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
