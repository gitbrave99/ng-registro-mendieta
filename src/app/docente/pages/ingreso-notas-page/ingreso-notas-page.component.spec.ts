import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoNotasPageComponent } from './ingreso-notas-page.component';

describe('IngresoNotasPageComponent', () => {
  let component: IngresoNotasPageComponent;
  let fixture: ComponentFixture<IngresoNotasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngresoNotasPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngresoNotasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
