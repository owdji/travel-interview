import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent ,IonText ,IonList ,IonItemSliding ,IonItemOptions, IonItem ,IonLabel } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TripResponse } from '../models/trip-response.type';
import { IonFab, IonFabButton, IonIcon, IonFabList, IonButton,  IonButtons} from '@ionic/angular/standalone';
// import { AuthService } from "src/app/security/auth.service";
import { AuthService } from '../security/auth.service';
import { logOut as logOutIcon } from "ionicons/icons";
import { Router } from "@angular/router";
import { TripService } from '../services/trips-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItemOptions, IonItemSliding, IonList, IonText, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonFab,IonFabButton, IonIcon, IonFabList, IonButton, IonButtons, IonItem, CommonModule]
})
export class Tab1Page {
  trips: TripResponse[];
  readonly logOutIcon = logOutIcon;

  constructor(
    private tripService: TripService,
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router,
  ) {
    this.trips = [];
  }

  ngOnInit() {
    this.getTrips();
  }

  // Add a method to log out.
  logOut() {
    console.log("logging out...");
    //create an alert to confirm the user wants to log out
    const isConfirmed = confirm("Are you sure you want to log out?");
    if (!isConfirmed) {
      return;
    }
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }

  getTrips() {
    this.tripService.getTrips().subscribe({
      next: (trips) => (this.trips = trips),
      error: (err) => console.log(err),
    });
  }

  caMarche(trip: any) {
    console.log("ca marche", trip);
    this.trips.push(trip);
  }
}
