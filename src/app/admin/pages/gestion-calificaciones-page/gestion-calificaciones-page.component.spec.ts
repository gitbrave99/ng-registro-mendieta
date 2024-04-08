import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCalificacionesPageComponent } from './gestion-calificaciones-page.component';

describe('GestionCalificacionesPageComponent', () => {
  let component: GestionCalificacionesPageComponent;
  let fixture: ComponentFixture<GestionCalificacionesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionCalificacionesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionCalificacionesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
