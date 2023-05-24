import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodebarComponent } from './codebar.component';

describe('CodebarComponent', () => {
  let component: CodebarComponent;
  let fixture: ComponentFixture<CodebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodebarComponent]
    });
    fixture = TestBed.createComponent(CodebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
