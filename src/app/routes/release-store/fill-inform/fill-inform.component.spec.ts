import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInformComponent } from './fill-inform.component';

describe('FillInformComponent', () => {
  let component: FillInformComponent;
  let fixture: ComponentFixture<FillInformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillInformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillInformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
