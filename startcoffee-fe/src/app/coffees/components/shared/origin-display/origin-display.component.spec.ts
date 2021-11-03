import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginDisplayComponent } from './origin-display.component';

describe('OriginDisplayComponent', () => {
  let component: OriginDisplayComponent;
  let fixture: ComponentFixture<OriginDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OriginDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
