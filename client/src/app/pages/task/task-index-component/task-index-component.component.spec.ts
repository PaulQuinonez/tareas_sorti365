import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskIndexComponentComponent } from './task-index-component.component';

describe('TaskIndexComponentComponent', () => {
  let component: TaskIndexComponentComponent;
  let fixture: ComponentFixture<TaskIndexComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskIndexComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskIndexComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
