import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { PlaceResponse } from '../models/place-response.type';
import { TripResponse, TripResponseArray } from '../models/trip-response.type';
import { PlacesService } from './places-service.service';


@Injectable({
  providedIn: 'root'
})
export class TripService {

  private apiUrl = 'https://comem-travel-log-api-2hr8.onrender.com/api/trips';

  constructor(private http: HttpClient, private placesService: PlacesService) { }

  getTrips(): Observable<TripResponse[]> {
    return this.http.get<TripResponse[]>(this.apiUrl);
  }

  getTrip(id: number): Observable<TripResponse> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<TripResponse>(url);
  }

  // a faire plus tard ne marche pas encore...
  // getPlacesForTrip(tripId: number): Observable<PlaceResponse[]> {
  //   const placesUrl = `${this.placesService.apiUrl}/${tripId}`;
  //   return this.placesService.getPlaces();
  // }
}