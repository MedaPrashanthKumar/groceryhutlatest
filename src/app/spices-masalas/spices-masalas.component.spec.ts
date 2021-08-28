import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpicesMasalasComponent } from './spices-masalas.component';

describe('SpicesMasalasComponent', () => {
  let component: SpicesMasalasComponent;
  let fixture: ComponentFixture<SpicesMasalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpicesMasalasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpicesMasalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
