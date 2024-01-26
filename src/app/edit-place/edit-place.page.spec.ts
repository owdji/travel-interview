import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPlacePage } from './edit-place.page';

describe('EditPlacePage', () => {
  let component: EditPlacePage;
  let fixture: ComponentFixture<EditPlacePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditPlacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
