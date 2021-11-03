import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCountryProfileComponent } from './user-country-profile.component';

describe('UserCountryProfileComponent', () => {
  let component: UserCountryProfileComponent;
  let fixture: ComponentFixture<UserCountryProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCountryProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCountryProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
