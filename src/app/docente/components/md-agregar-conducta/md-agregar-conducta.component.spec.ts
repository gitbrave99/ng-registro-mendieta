import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdAgregarConductaComponent } from './md-agregar-conducta.component';

describe('MdAgregarConductaComponent', () => {
  let component: MdAgregarConductaComponent;
  let fixture: ComponentFixture<MdAgregarConductaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MdAgregarConductaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdAgregarConductaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
