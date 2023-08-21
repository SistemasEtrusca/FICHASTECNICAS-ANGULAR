import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAccesoriosComponent } from './menu-accesorios.component';

describe('MenuAccesoriosComponent', () => {
  let component: MenuAccesoriosComponent;
  let fixture: ComponentFixture<MenuAccesoriosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuAccesoriosComponent]
    });
    fixture = TestBed.createComponent(MenuAccesoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
