import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoffeeArchiveComponent } from './coffee-archive.component';

describe('CoffeeArchiveComponent', () => {
  let component: CoffeeArchiveComponent;
  let fixture: ComponentFixture<CoffeeArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
