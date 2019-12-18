import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobInfComponent } from './job-inf.component';

describe('JobInfComponent', () => {
  let component: JobInfComponent;
  let fixture: ComponentFixture<JobInfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobInfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
