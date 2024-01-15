import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonicModule } from '@ionic/angular';
import { TripService } from '../services/trips-service.service';
import { TripResponse } from '../models/trip-response.type';
import { CommonModule } from '@angular/common';


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
  constructor(private tripService : TripService) {
    this.trips = [];
  }

  getTrip(){
    this.tripService.getTrip().subscribe({
      next: trip => this.trips.push(trip), // Use the 'places' property
      error: err => console.log(err),
    })
    console.log('DATA', this.trips)
  }

  ngOnInit() {
    //console.log each object of the array one by one
    this.getTrip();
    this.trips.forEach((trip) => {
      console.log(trip);
    });

  }
}
