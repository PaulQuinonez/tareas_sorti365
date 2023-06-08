import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashIndexComponentComponent } from './trash-index-component.component';

describe('TrashIndexComponentComponent', () => {
  let component: TrashIndexComponentComponent;
  let fixture: ComponentFixture<TrashIndexComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrashIndexComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashIndexComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
