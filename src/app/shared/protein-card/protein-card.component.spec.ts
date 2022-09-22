import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinCardComponent } from './protein-card.component';

describe('ProteinCardComponent', () => {
  let component: ProteinCardComponent;
  let fixture: ComponentFixture<ProteinCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProteinCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProteinCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
