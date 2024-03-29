import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonicModule } from '@ionic/angular';
import { TripService } from '../services/trips-service.service';
import { TripResponse } from '../models/trip-response.type';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AddPlacePage } from '../add-place/add-place.page';
import { User } from '../security/user.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../security/auth.service';

const API_URL = "https://comem-travel-log-api-2hr8.onrender.com/api/";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  providers: [AuthService], 
  // imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonicModule],
  imports: [IonicModule, CommonModule, FormsModule, ExploreContainerComponent]
})
export class Tab3Page {
  trips: TripResponse[];
  editingTripId: string | null = null;
  constructor(
    private modalController: ModalController, // Inject ModalController
    private tripService: TripService,
    private http: HttpClient,
    private router: Router, // Inject the Router service
    private auth: AuthService,
    private authService: AuthService, // Add this line
    ) {
    this.trips = [];
    
  }

  getTrips() {
    this.tripService.getTrips().subscribe({
      next: (trips) => {
        this.trips = trips;
        this.trips.forEach((trip) => {
          this.authService.getUserById$(trip.userId as string).subscribe((user: User) => {
            trip.user = user;
          });
        });
      },
      error: (err) => console.log(err),
    });
  }

  caMarche(trip: any) {
    console.log("ca marche", trip);
    this.trips.push(trip);
  }

  navigateToAddTrip(){
    this.router.navigate(['/add-trip']);
  }

  deleteTrip(trip: any) {
    // Afficher une boîte de dialogue de confirmation
    const isConfirmed = window.confirm(`Are you sure you want to delete "${trip.title}" ?`);

    if (isConfirmed) {
      this.tripService.deleteTrip(trip.id).subscribe({
        next: () => {
          // Retirer le voyage supprimé du tableau local
          this.trips = this.trips.filter(t => t.id !== trip.id);
        },
        error: (err) => console.log(err),
      });
    }
  }

  editTrip(trip: any) {
    this.editingTripId = trip.id;
  }
  saveChanges(trip: TripResponse) {
    this.tripService.editTrip(trip).subscribe({
      next: () => {
        // Retirer l'ID du voyage en cours d'édition
        this.editingTripId = null;
      },
      error: (err) => console.log(err),
    });
  }



  cancelEdit() {
    this.editingTripId = null;
  }

  async openAddPlaceModal(tripName: string, tripId: any) {
    const modal = await this.modalController.create({
      component: AddPlacePage, // Specify the modal component
      cssClass: 'add-place', // Optional CSS class for styling
      componentProps: {
        tripName: tripName, // Pass the trip name to the modal component
        tripId: tripId
      },
    });

    return await modal.present();
  }
  

  ngOnInit() {
    //console.log each object of the array one by one
    this.getTrips();
  }
}
