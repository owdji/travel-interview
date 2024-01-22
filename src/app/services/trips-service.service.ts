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

  //POST
  postTrip(trip: TripResponse): Observable<TripResponse> {
    //on créer un header et on y met le bearer
    //(test avec leo leo2000 codé en dur)
    // const headers = new HttpHeaders({ 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDcxMjk3NDcuMDEsInN1YiI6ImE2NTA3MTMxLWNjZGMtNGU3Yi04MWNkLTI1YTBhNTkwNmIyOSIsImlhdCI6MTcwNTkyMDE0N30.rN-qkVcZhW9p4wbW8V8gb7Q8IaLQAII39shrqyceEeo'})
    // return this.http.post<TripResponse>(this.apiUrl, trip, {headers});
    return this.http.post<TripResponse>(this.apiUrl, trip);

  }

  //DELETE
  deleteTrip(tripId: number): Observable<TripResponse> {
    const url = `${this.apiUrl}/${tripId}`;
    // const headers = new HttpHeaders({ 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDcxMjk3NDcuMDEsInN1YiI6ImE2NTA3MTMxLWNjZGMtNGU3Yi04MWNkLTI1YTBhNTkwNmIyOSIsImlhdCI6MTcwNTkyMDE0N30.rN-qkVcZhW9p4wbW8V8gb7Q8IaLQAII39shrqyceEeo'})
    // return this.http.delete<TripResponse>(url, {headers});
    return this.http.delete<TripResponse>(url);

  }
}