import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChartProfileComponent } from './user-chart-profile.component';

describe('UserChartProfileComponent', () => {
  let component: UserChartProfileComponent;
  let fixture: ComponentFixture<UserChartProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChartProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChartProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
