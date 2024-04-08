import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearLectivoPageComponent } from './year-lectivo-page.component';

describe('YearLectivoPageComponent', () => {
  let component: YearLectivoPageComponent;
  let fixture: ComponentFixture<YearLectivoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YearLectivoPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YearLectivoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
