import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdImprimirNotasComponent } from './md-imprimir-notas.component';

describe('MdImprimirNotasComponent', () => {
  let component: MdImprimirNotasComponent;
  let fixture: ComponentFixture<MdImprimirNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MdImprimirNotasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdImprimirNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
