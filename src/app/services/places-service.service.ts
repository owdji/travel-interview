import { Injectable } from '@angular/core';
import { Place } from '../models/place.type';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PlaceResponse } from '../models/place-response.type';

// @Injectable({
//   providedIn: 'root'
// })
// export class PlaceService {
//   constructor(private http: HttpClient) { }

//   getPlace(): Observable<PlaceResponse> {
//     return this.http
//       .get<PlaceResponse>('https://comem-travel-log-api-2hr8.onrender.com/api/places')
//       .pipe(map(convertPlaceResponseToPlace));
//   }
// }

// function convertPlaceResponseToPlace(response: PlaceResponse): Placere {
//   return {
//     text: response.name,
//   }
// }