import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseIndustryComponent } from './choose-industry.component';

describe('ChooseIndustryComponent', () => {
  let component: ChooseIndustryComponent;
  let fixture: ComponentFixture<ChooseIndustryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseIndustryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
