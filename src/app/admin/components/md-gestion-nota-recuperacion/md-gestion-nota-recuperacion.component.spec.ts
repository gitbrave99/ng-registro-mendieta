import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdGestionNotaRecuperacionComponent } from './md-gestion-nota-recuperacion.component';

describe('MdGestionNotaRecuperacionComponent', () => {
  let component: MdGestionNotaRecuperacionComponent;
  let fixture: ComponentFixture<MdGestionNotaRecuperacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MdGestionNotaRecuperacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdGestionNotaRecuperacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
