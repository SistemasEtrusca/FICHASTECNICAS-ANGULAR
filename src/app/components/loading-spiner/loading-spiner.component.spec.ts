import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSpinerComponent } from './loading-spiner.component';

describe('LoadingSpinerComponent', () => {
  let component: LoadingSpinerComponent;
  let fixture: ComponentFixture<LoadingSpinerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingSpinerComponent]
    });
    fixture = TestBed.createComponent(LoadingSpinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
