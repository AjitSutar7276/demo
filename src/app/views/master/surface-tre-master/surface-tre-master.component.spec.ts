import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurfaceTreMasterComponent } from './surface-tre-master.component';

describe('SurfaceTreMasterComponent', () => {
  let component: SurfaceTreMasterComponent;
  let fixture: ComponentFixture<SurfaceTreMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurfaceTreMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurfaceTreMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
