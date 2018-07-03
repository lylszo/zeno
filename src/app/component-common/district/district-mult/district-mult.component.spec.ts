import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictMultComponent } from './district-mult.component';

describe('DistrictMultComponent', () => {
  let component: DistrictMultComponent;
  let fixture: ComponentFixture<DistrictMultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictMultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictMultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
