import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadeMasterComponent } from './shade-master.component';

describe('ShadeMasterComponent', () => {
  let component: ShadeMasterComponent;
  let fixture: ComponentFixture<ShadeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShadeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShadeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
