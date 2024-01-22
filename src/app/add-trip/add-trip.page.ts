import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { TripResponse } from '../models/trip-response.type';
import { TripService } from '../services/trips-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.page.html',
  styleUrls: ['./add-trip.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ExploreContainerComponent]
})
export class AddTripPage implements OnInit {
  trips: TripResponse[];
  tripTitle: string;
  tripDescription: string;

  constructor(
    private tripService: TripService,
    private toastController: ToastController,
    private router: Router // Inject the Router service

  ) {
    this.trips = [];
    this.tripTitle = '';
    this.tripDescription = '';
  }

  ngOnInit() {}

  postTrip() {
    const trip: TripResponse = {
      title: this.tripTitle,
      description: this.tripDescription,
    };

    this.tripService.postTrip(trip).subscribe({
      next: (trip) => this.caMarche(trip),
      error: (err) => console.log(err),
    });
  }

  async caMarche(trip: any) {
    console.log("ca marche", trip);
    this.trips.push(trip);

    // Display a toast when caMarche is called
    await this.presentToast('top');

    this.router.navigate(['/tabs/tab3']);

  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: `Le voyage "${this.tripTitle}" a bien été ajouté 🎉`,
      duration: 5000,
      position: position,
    });

    await toast.present();
  }
}
