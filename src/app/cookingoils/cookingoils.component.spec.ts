import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookingoilsComponent } from './cookingoils.component';

describe('CookingoilsComponent', () => {
  let component: CookingoilsComponent;
  let fixture: ComponentFixture<CookingoilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookingoilsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CookingoilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
