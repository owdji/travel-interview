import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonFab, IonFabButton, IonIcon, IonFabList } from '@ionic/angular/standalone';
import { IonButton, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TripResponse } from '../models/trip-response.type';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [ExploreContainerComponent, IonicModule, CommonModule]
})
export class Tab1Page {
  constructor() {}

  //create a postTrip function
  postTrip() {
    
  }
}
