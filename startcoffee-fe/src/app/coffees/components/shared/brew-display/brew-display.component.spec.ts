import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrewDisplayComponent } from './brew-display.component';

describe('BrewDisplayComponent', () => {
  let component: BrewDisplayComponent;
  let fixture: ComponentFixture<BrewDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrewDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrewDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
