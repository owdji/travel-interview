import { TestBed } from '@angular/core/testing';

import { PlacesServiceService } from './places-service.service';

describe('PlacesServiceService', () => {
  let service: PlacesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlacesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
