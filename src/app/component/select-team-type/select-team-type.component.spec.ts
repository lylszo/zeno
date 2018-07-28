import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTeamTypeComponent } from './select-team-type.component';

describe('SelectTeamTypeComponent', () => {
  let component: SelectTeamTypeComponent;
  let fixture: ComponentFixture<SelectTeamTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTeamTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTeamTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
