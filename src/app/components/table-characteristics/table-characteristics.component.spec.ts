import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCharacteristicsComponent } from './table-characteristics.component';

describe('TableCharacteristicsComponent', () => {
  let component: TableCharacteristicsComponent;
  let fixture: ComponentFixture<TableCharacteristicsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableCharacteristicsComponent]
    });
    fixture = TestBed.createComponent(TableCharacteristicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
