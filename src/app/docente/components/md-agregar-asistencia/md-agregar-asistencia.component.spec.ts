import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdAgregarAsistenciaComponent } from './md-agregar-asistencia.component';

describe('MdAgregarAsistenciaComponent', () => {
  let component: MdAgregarAsistenciaComponent;
  let fixture: ComponentFixture<MdAgregarAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MdAgregarAsistenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdAgregarAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
