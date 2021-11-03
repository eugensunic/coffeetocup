import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDefaultProfileComponent } from './user-default-profile.component';

describe('UserDefaultProfileComponent', () => {
  let component: UserDefaultProfileComponent;
  let fixture: ComponentFixture<UserDefaultProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDefaultProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDefaultProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
