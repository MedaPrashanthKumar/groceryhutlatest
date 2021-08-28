import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DairyproductsComponent } from './dairyproducts.component';

describe('DairyproductsComponent', () => {
  let component: DairyproductsComponent;
  let fixture: ComponentFixture<DairyproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DairyproductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DairyproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
