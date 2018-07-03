import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseDistrictComponent } from './choose-district.component';

describe('ChooseDistrictComponent', () => {
  let component: ChooseDistrictComponent;
  let fixture: ComponentFixture<ChooseDistrictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseDistrictComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
