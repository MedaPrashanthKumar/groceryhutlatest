import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OilsGheesComponent } from './oils-ghees.component';

describe('OilsGheesComponent', () => {
  let component: OilsGheesComponent;
  let fixture: ComponentFixture<OilsGheesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OilsGheesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OilsGheesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
