import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { PlaceResponse } from '../models/place-response.type';
import { TripResponse, TripResponseArray } from '../models/trip-response.type';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = 'https://comem-travel-log-api-2hr8.onrender.com/api/trips';

    constructor(private http: HttpClient) { }
    getTrips(): Observable<TripResponseArray> {
      return this.http
        .get<TripResponseArray>(this.apiUrl)
        .pipe(
          map((trips: TripResponseArray) => trips.map((trip: TripResponse) => ({
            ...trip,
            places: this.getPlacesForTrip(trip.id)
          })))
        );
    }
  
    private getPlacesForTrip(tripId: string): PlaceResponse[] {
      // TODO: Implement this method to retrieve the places for a given trip
      // For now, we'll just return an empty array
      return [];
    }
}
