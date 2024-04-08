import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdAgregarNotaComponent } from './md-agregar-nota.component';

describe('MdAgregarNotaComponent', () => {
  let component: MdAgregarNotaComponent;
  let fixture: ComponentFixture<MdAgregarNotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MdAgregarNotaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdAgregarNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
