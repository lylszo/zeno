import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopServiceComponent } from './shop-service.component';

describe('ShopServiceComponent', () => {
  let component: ShopServiceComponent;
  let fixture: ComponentFixture<ShopServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
