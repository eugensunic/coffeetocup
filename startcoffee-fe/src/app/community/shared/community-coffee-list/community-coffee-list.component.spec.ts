import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityCoffeeListComponent } from './community-coffee-list.component';

describe('CommunityCoffeeListComponent', () => {
  let component: CommunityCoffeeListComponent;
  let fixture: ComponentFixture<CommunityCoffeeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityCoffeeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityCoffeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
