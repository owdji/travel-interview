import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { PlaceService } from '../services/places-service.service';
// import { Place } from '../models/place.type';
// import { PlaceResponse } from '../models/place-response.type';
import { TripResponse } from '../models/trip-response.type';
import { TripService } from '../services/trips-service.service';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.page.html',
  styleUrls: ['./add-place.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AddPlacePage implements OnInit {
  // apiUrl = 'https://comem-travel-log-api-2hr8.onrender.com/api/places';
  // //token d'authentification codée en dur pour l'instant
  // authToker='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDYwMDI1ODAuMTM0LCJzdWIiOiI0NWY5NzE2Yy1kYmJjLTQzOTktYWY1Yy02OTdmNmFkNDYwMzIiLCJpYXQiOjE3MDQ3OTI5ODB9.bLbVvEr7jHjrhPl5kJ_LeWtAHqWhmRvJu1ByAyMvDrE'
  // // places: PlaceResponse[]; 
  // trips: TripResponse[];


  @ViewChild('presentAlert', { static: false }) presentAlert: HTMLIonAlertElement | undefined;

  // constructor(private http: HttpClient, private placesServiceService : PlacesServiceService) { }
    // constructor(private tripService : TripService) {
    //   this.trips = [];
    // } 
    // addPlace(){
    //   // this.places.push(this.placeService.getPlace());
    // }

  //   addTrip(){
  //     this.tripService.getTrip().subscribe(trip => {
  //       this.trips.push(trip);
  //     })
  //   }

  //   getTrip(){
  //     this.tripService.getTrip().subscribe({
  //       next: trip => this.trips.push(trip), // Use the 'places' property
  //       error: err => console.log(err),
  //     })
  //     console.log('DATA', this.trips)
  //   }



  ngOnInit() {
  }
}

  //🚧🚧🚧🚧🚧
  // // places: any[] = []; // Declare the 'places' property

  // // addPlace(){
  // //   //🚧🚧🚧 c'est quoi places ? 
  // //   this.placesServiceService.getPlace().subscribe({
  // //     next: place => this.places.push(place), // Use the 'places' property
  // //     error: err => console.log(err),
  // //   })
  // // }

  // async onCreatePlace(placeForm: any) {
  //   // //création du header
  //   // const headers = new HttpHeaders({
  //   //   'Content-Type': 'application/json',
  //   //   Authorization: `Bearer ${this.authToker}`
  //   // });

  //   if (placeForm.valid) {
  //     // const formData = placeForm.value;
  //     // console.log('Form Data:', formData);
  //     // // Here, you can perform further actions with the form data, like sending it to a service or API
  //     // try{
  //     //   const response = await this.http.post(this.apiUrl, formData, { headers }).toPromise();
  //     //   console.log('API Response:', response);
  //     // } catch (error) {
  //     //   console.error('API Error:', error);
  //     // }
  //     // console.log('data', this.places)



  //   } else {
  //     // Handle invalid form data by showing the custom alert if presentAlert is defined
  //     if (this.presentAlert) {
  //       await this.presentAlert.present();
  //     }
  //   }