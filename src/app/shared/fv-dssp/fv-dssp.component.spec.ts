import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FvDsspComponent } from './fv-dssp.component';

describe('FvDsspComponent', () => {
  let component: FvDsspComponent;
  let fixture: ComponentFixture<FvDsspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FvDsspComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FvDsspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
