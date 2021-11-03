import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCountryUniqueComponent } from './user-country-unique.component';

describe('UserCountryUniqueComponent', () => {
  let component: UserCountryUniqueComponent;
  let fixture: ComponentFixture<UserCountryUniqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCountryUniqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCountryUniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
