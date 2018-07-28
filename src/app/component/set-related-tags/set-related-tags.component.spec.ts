import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetRelatedTagsComponent } from './set-related-tags.component';

describe('SetRelatedTagsComponent', () => {
  let component: SetRelatedTagsComponent;
  let fixture: ComponentFixture<SetRelatedTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetRelatedTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetRelatedTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
