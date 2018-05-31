import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberManageComponent } from './member-manage.component';

describe('MemberManageComponent', () => {
  let component: MemberManageComponent;
  let fixture: ComponentFixture<MemberManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
