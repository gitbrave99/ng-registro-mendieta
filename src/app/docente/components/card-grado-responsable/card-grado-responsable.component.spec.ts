import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGradoResponsableComponent } from './card-grado-responsable.component';

describe('CardGradoResponsableComponent', () => {
  let component: CardGradoResponsableComponent;
  let fixture: ComponentFixture<CardGradoResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardGradoResponsableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardGradoResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
