import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletaGestionGradosPageComponent } from './boleta-gestion-grados-page.component';

describe('BoletaGestionGradosPageComponent', () => {
  let component: BoletaGestionGradosPageComponent;
  let fixture: ComponentFixture<BoletaGestionGradosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoletaGestionGradosPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoletaGestionGradosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
