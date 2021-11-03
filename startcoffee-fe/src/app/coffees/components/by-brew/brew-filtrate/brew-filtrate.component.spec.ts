import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrewFiltrateComponent } from './brew-filtrate.component';

describe('BrewFiltrateComponent', () => {
  let component: BrewFiltrateComponent;
  let fixture: ComponentFixture<BrewFiltrateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrewFiltrateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrewFiltrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
