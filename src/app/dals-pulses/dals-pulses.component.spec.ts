import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DalsPulsesComponent } from './dals-pulses.component';

describe('DalsPulsesComponent', () => {
  let component: DalsPulsesComponent;
  let fixture: ComponentFixture<DalsPulsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DalsPulsesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DalsPulsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
