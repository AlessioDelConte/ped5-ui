import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsDownloadMenuComponent } from './assets-download-menu.component';

describe('AssetsDownloadMenuComponent', () => {
  let component: AssetsDownloadMenuComponent;
  let fixture: ComponentFixture<AssetsDownloadMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetsDownloadMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsDownloadMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
