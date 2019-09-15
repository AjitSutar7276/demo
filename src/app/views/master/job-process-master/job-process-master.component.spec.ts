import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobProcessMasterComponent } from './job-process-master.component';

describe('JobProcessMasterComponent', () => {
  let component: JobProcessMasterComponent;
  let fixture: ComponentFixture<JobProcessMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobProcessMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobProcessMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
