import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseOkComponent } from './release-ok.component';

describe('ReleaseOkComponent', () => {
  let component: ReleaseOkComponent;
  let fixture: ComponentFixture<ReleaseOkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseOkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
