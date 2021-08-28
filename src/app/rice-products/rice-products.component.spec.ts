import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RiceProductsComponent } from './rice-products.component';

describe('RiceProductsComponent', () => {
  let component: RiceProductsComponent;
  let fixture: ComponentFixture<RiceProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiceProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiceProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
