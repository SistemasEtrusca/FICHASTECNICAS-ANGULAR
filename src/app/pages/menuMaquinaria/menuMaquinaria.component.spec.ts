import { ComponentFixture, TestBed } from '@angular/core/testing';

import { menuMaquinariaComponent } from './menuMaquinaria.component';

describe('IndexComponent', () => {
  let component: menuMaquinariaComponent;
  let fixture: ComponentFixture<menuMaquinariaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [menuMaquinariaComponent]
    });
    fixture = TestBed.createComponent(menuMaquinariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
