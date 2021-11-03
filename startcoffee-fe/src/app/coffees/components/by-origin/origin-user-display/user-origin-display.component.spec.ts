import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserOriginDisplayComponent } from './user-origin-display.component';

describe('UserDisplayComponent', () => {
  let component: UserOriginDisplayComponent;
  let fixture: ComponentFixture<UserOriginDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOriginDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOriginDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
