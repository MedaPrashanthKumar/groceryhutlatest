import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomecardsComponent } from './homecards.component';

describe('HomecardsComponent', () => {
  let component: HomecardsComponent;
  let fixture: ComponentFixture<HomecardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomecardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomecardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
