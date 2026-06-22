import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalAddEditForm } from './journal-add-edit-form';

describe('JournalAddEditForm', () => {
  let component: JournalAddEditForm;
  let fixture: ComponentFixture<JournalAddEditForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JournalAddEditForm],
    }).compileComponents();

    fixture = TestBed.createComponent(JournalAddEditForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
