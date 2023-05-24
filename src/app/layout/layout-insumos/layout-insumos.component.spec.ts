import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutInsumosComponent } from './layout-insumos.component';

describe('LayoutInsumosComponent', () => {
  let component: LayoutInsumosComponent;
  let fixture: ComponentFixture<LayoutInsumosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutInsumosComponent]
    });
    fixture = TestBed.createComponent(LayoutInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
