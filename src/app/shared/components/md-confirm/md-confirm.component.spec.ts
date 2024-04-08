import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdConfirmComponent } from './md-confirm.component';

describe('MdConfirmComponent', () => {
  let component: MdConfirmComponent;
  let fixture: ComponentFixture<MdConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MdConfirmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
