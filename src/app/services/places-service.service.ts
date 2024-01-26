import { Injectable } from '@angular/core';
import { Place } from '../models/place.type';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PlaceResponse } from '../models/place-response.type';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private apiUrl = 'https://comem-travel-log-api-2hr8.onrender.com/api/places';

  constructor(private http: HttpClient) { }

  getPlaces(): Observable<PlaceResponse[]> {
    return this.http.get<PlaceResponse[]>(this.apiUrl);
  }

  getPlace(id: number): Observable<PlaceResponse> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<PlaceResponse>(url);
  }

  //POST
  postPlace(place: PlaceResponse): Observable<PlaceResponse> {
    return this.http.post<PlaceResponse>(this.apiUrl, place);
  }
}