import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdResumenNotasComponent } from './md-resumen-notas.component';

describe('MdResumenNotasComponent', () => {
  let component: MdResumenNotasComponent;
  let fixture: ComponentFixture<MdResumenNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MdResumenNotasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdResumenNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
