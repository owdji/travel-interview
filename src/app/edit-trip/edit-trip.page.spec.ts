import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditTripPage } from './edit-trip.page';

describe('EditTripPage', () => {
  let component: EditTripPage;
  let fixture: ComponentFixture<EditTripPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditTripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
