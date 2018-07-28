import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictManageComponent } from './district-manage.component';

describe('DistrictManageComponent', () => {
  let component: DistrictManageComponent;
  let fixture: ComponentFixture<DistrictManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
