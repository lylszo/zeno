import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCityMultiComponent } from './select-city-multi.component';

describe('SelectCityMultiComponent', () => {
  let component: SelectCityMultiComponent;
  let fixture: ComponentFixture<SelectCityMultiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCityMultiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCityMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
