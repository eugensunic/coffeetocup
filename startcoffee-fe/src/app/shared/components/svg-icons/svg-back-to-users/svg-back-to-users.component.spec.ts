import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgBackToUsersComponent } from './svg-back-to-users.component';

describe('SvgBackToUsersComponent', () => {
  let component: SvgBackToUsersComponent;
  let fixture: ComponentFixture<SvgBackToUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgBackToUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgBackToUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
