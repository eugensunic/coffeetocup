import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgShowUsersComponent } from './svg-show-users.component';

describe('SvgShowUsersComponent', () => {
  let component: SvgShowUsersComponent;
  let fixture: ComponentFixture<SvgShowUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgShowUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgShowUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
