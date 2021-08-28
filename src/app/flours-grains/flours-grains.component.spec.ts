import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloursGrainsComponent } from './flours-grains.component';

describe('FloursGrainsComponent', () => {
  let component: FloursGrainsComponent;
  let fixture: ComponentFixture<FloursGrainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloursGrainsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloursGrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
