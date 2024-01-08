import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTripPage } from './add-trip.page';

describe('AddTripPage', () => {
  let component: AddTripPage;
  let fixture: ComponentFixture<AddTripPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddTripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
