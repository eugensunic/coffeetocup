import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OriginFiltrateComponent } from './origin-filtrate.component';

describe('OriginFiltrateComponent', () => {
  let component: OriginFiltrateComponent;
  let fixture: ComponentFixture<OriginFiltrateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OriginFiltrateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginFiltrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
