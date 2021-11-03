import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgArchiveIconComponent } from './svg-archive-icon.component';

describe('SvgArchiveIconComponent', () => {
  let component: SvgArchiveIconComponent;
  let fixture: ComponentFixture<SvgArchiveIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgArchiveIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgArchiveIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
