import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingDancingSquaresComponent } from './loading-dancing-squares.component';

describe('LoadingDancingSquaresComponent', () => {
  let component: LoadingDancingSquaresComponent;
  let fixture: ComponentFixture<LoadingDancingSquaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingDancingSquaresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingDancingSquaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
