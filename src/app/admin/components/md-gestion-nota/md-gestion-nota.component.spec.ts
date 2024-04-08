import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdGestionNotaComponent } from './md-gestion-nota.component';

describe('MdGestionNotaComponent', () => {
  let component: MdGestionNotaComponent;
  let fixture: ComponentFixture<MdGestionNotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MdGestionNotaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdGestionNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
