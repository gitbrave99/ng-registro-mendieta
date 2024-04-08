import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListaGradosComponent } from './card-lista-grados.component';

describe('CardListaGradosComponent', () => {
  let component: CardListaGradosComponent;
  let fixture: ComponentFixture<CardListaGradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardListaGradosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardListaGradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
