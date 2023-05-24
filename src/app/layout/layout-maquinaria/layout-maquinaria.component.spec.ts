import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMaquinariaComponent } from './layout-maquinaria.component';

describe('LayoutMaquinariaComponent', () => {
  let component: LayoutMaquinariaComponent;
  let fixture: ComponentFixture<LayoutMaquinariaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutMaquinariaComponent]
    });
    fixture = TestBed.createComponent(LayoutMaquinariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
