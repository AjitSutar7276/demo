import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobProductionComponent } from './job-production.component';

describe('JobProductionComponent', () => {
  let component: JobProductionComponent;
  let fixture: ComponentFixture<JobProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
