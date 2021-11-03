import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgUploadImageComponent } from './svg-upload-image.component';

describe('SvgUploadImageComponent', () => {
  let component: SvgUploadImageComponent;
  let fixture: ComponentFixture<SvgUploadImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgUploadImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgUploadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
