import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdGestionConductaComponent } from './md-gestion-conducta.component';

describe('MdGestionConductaComponent', () => {
  let component: MdGestionConductaComponent;
  let fixture: ComponentFixture<MdGestionConductaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MdGestionConductaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdGestionConductaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
