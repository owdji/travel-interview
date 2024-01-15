import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { PlaceResponse } from '../models/place-response.type';
import { TripResponse } from '../models/trip-response.type';

@Injectable({
  providedIn: 'root'
})
export class TripService {
    constructor(private http: HttpClient) { }
  getTrip(): Observable<TripResponse> {
    return this.http
        .get<TripResponse>('https://comem-travel-log-api-2hr8.onrender.com/api/trips/376c6ccc-91a1-4c68-bfe2-435cd3cf1b03')
  }
}
