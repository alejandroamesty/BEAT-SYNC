import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAccountPage } from './edit-account.page';

describe('EditAccountPage', () => {
  let component: EditAccountPage;
  let fixture: ComponentFixture<EditAccountPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
