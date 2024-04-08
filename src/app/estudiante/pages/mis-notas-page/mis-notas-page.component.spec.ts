import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisNotasPageComponent } from './mis-notas-page.component';

describe('MisNotasComponent', () => {
  let component: MisNotasPageComponent;
  let fixture: ComponentFixture<MisNotasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MisNotasPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MisNotasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
