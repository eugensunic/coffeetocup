import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PourOverFormComponent } from './pour-over-form.component';

describe('PourOverFormComponent', () => {
  let component: PourOverFormComponent;
  let fixture: ComponentFixture<PourOverFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PourOverFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PourOverFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
