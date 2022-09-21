import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniprotProteinViewComponent } from './uniprot-protein-view.component';

describe('UniprotProteinViewComponent', () => {
  let component: UniprotProteinViewComponent;
  let fixture: ComponentFixture<UniprotProteinViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniprotProteinViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniprotProteinViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
