import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgEditIconComponent } from './svg-edit-icon.component';

describe('SvgEditIconComponent', () => {
  let component: SvgEditIconComponent;
  let fixture: ComponentFixture<SvgEditIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgEditIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgEditIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
