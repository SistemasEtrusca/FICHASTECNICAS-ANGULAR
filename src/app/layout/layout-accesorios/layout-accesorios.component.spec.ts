import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAccesoriosComponent } from './layout-accesorios.component';

describe('LayoutAccesoriosComponent', () => {
  let component: LayoutAccesoriosComponent;
  let fixture: ComponentFixture<LayoutAccesoriosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutAccesoriosComponent]
    });
    fixture = TestBed.createComponent(LayoutAccesoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
