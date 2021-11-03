import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCountryWrapperComponent } from './user-country-wrapper.component';

describe('UserCountryWrapperComponent', () => {
  let component: UserCountryWrapperComponent;
  let fixture: ComponentFixture<UserCountryWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCountryWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCountryWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
