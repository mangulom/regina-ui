import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrdenPagoComponent } from './edit-orden-pago.component';

describe('EditOrdenPagoComponent', () => {
  let component: EditOrdenPagoComponent;
  let fixture: ComponentFixture<EditOrdenPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditOrdenPagoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOrdenPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
