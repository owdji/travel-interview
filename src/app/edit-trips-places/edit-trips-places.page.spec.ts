import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditTripsPlacesPage } from './edit-trips-places.page';

describe('EditTripsPlacesPage', () => {
  let component: EditTripsPlacesPage;
  let fixture: ComponentFixture<EditTripsPlacesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditTripsPlacesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
