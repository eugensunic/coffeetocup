import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgShareIconComponent } from './svg-share-icon.component';

describe('SvgShareIconComponent', () => {
  let component: SvgShareIconComponent;
  let fixture: ComponentFixture<SvgShareIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgShareIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgShareIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
