import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OthergroceryComponent } from './othergrocery.component';

describe('OthergroceryComponent', () => {
  let component: OthergroceryComponent;
  let fixture: ComponentFixture<OthergroceryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OthergroceryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OthergroceryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
