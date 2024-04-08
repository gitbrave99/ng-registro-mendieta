import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdGestionAsistenciaComponent } from './md-gestion-asistencia.component';

describe('MdGestionAsistenciaComponent', () => {
  let component: MdGestionAsistenciaComponent;
  let fixture: ComponentFixture<MdGestionAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MdGestionAsistenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdGestionAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
