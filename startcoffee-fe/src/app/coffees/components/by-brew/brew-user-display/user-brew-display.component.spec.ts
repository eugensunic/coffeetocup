import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBrewDisplayComponent } from './user-brew-display.component';

describe('UserBrewDisplayComponent', () => {
  let component: UserBrewDisplayComponent;
  let fixture: ComponentFixture<UserBrewDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBrewDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBrewDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
