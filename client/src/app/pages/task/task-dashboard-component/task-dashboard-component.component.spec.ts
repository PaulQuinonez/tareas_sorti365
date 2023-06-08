import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDashboardComponentComponent } from './task-dashboard-component.component';

describe('TaskDashboardComponentComponent', () => {
  let component: TaskDashboardComponentComponent;
  let fixture: ComponentFixture<TaskDashboardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDashboardComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDashboardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
