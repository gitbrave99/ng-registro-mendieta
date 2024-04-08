import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdAgregarNotaRecuperacionComponent } from './md-agregar-nota-recuperacion.component';

describe('MdAgregarNotaRecuperacionComponent', () => {
  let component: MdAgregarNotaRecuperacionComponent;
  let fixture: ComponentFixture<MdAgregarNotaRecuperacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MdAgregarNotaRecuperacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdAgregarNotaRecuperacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
