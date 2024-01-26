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
import { PlaceResponse } from '../models/place-response.type'; // added
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  // imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonicModule],
  imports: [ExploreContainerComponent, IonicModule, CommonModule],
})
export class Tab3Page {
  trips: TripResponse[];

  constructor(
    private tripService: TripService,
    private router: Router, // Inject the Router service
    ) {
    this.trips = [];
    
  }

  getTrips() {
    this.tripService.getTrips().subscribe({
      next: (trips) => (this.trips = trips),
      error: (err) => console.log(err),
    });
  }

  postTrip(){
    //here is what a trip looks like
    // id: string;
    // href: string;
    // title: string;
    // description: string;
    // userId: string;
    // createdAt: string;
    // updatedAt: string;
    // places: PlaceResponse[];
    // placesCount: number;
    const trip: TripResponse = {
      title: 'Seoul with the boys',
      description: 'lets goooo',
    };
    
    this.tripService.postTrip(trip).subscribe({
      next: (trip) => this.caMarche(trip),
      error: (err) => console.log(err),
    });

  }

  caMarche(trip: any) {
    console.log("ca marche", trip);
    this.trips.push(trip);
  }

  navigateToAddPlace(){
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
  

  ngOnInit() {
    //console.log each object of the array one by one
    this.getTrips();
  }
}
