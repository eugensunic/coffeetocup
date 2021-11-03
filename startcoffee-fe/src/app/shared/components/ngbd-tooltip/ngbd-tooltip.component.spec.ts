import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbdTooltipComponent } from './ngbd-tooltip.component';

describe('NgbdTooltipComponent', () => {
  let component: NgbdTooltipComponent;
  let fixture: ComponentFixture<NgbdTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgbdTooltipComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbdTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
