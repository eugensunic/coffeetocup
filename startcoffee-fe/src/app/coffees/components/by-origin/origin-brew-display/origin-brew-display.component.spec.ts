import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OriginBrewDisplayComponent } from './origin-brew-display.component';

describe('OriginBrewDisplayComponent', () => {
  let component: OriginBrewDisplayComponent;
  let fixture: ComponentFixture<OriginBrewDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OriginBrewDisplayComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginBrewDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
