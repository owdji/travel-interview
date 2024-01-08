import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPlacePage } from './add-place.page';

describe('AddPlacePage', () => {
  let component: AddPlacePage;
  let fixture: ComponentFixture<AddPlacePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddPlacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
