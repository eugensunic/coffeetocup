import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltratedUsersComponent } from './filtrated-users.component';

describe('FiltratedUsersComponent', () => {
  let component: FiltratedUsersComponent;
  let fixture: ComponentFixture<FiltratedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltratedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltratedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
