import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdGestionGradoComponent } from './md-gestion-grado.component';

describe('MdGestionGradoComponent', () => {
  let component: MdGestionGradoComponent;
  let fixture: ComponentFixture<MdGestionGradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MdGestionGradoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdGestionGradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
