import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuInsumosComponent } from './menu-insumos.component';

describe('MenuInsumosComponent', () => {
  let component: MenuInsumosComponent;
  let fixture: ComponentFixture<MenuInsumosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuInsumosComponent]
    });
    fixture = TestBed.createComponent(MenuInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
