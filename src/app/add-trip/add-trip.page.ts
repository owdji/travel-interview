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
  imports: [IonicModule, CommonModule, FormsModule, ExploreContainerComponent],
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
      error: (err) => this.handlePostTripError(err),
    });
  }

  async handlePostTripError(error: any) {
    if (this.hasValidationErrors(error)) {
      // Display a specific message for validation errors
      await this.presentToast('top', 'Validation error: Please check your input. The title must be at least 3 characters long. The description must be at least 5 characters long.');
      return;
    }
  
    // Display a generic error message for other cases
    await this.presentToast('top', error.message || 'An error occurred while posting the trip. Please try again later.');
  }
  
  hasValidationErrors(error: any): boolean {
    if (!error) {
      return false;
    }
  
    if (error.status === 422) {
      return true;
    }
  
    // Check recursively if the error chain contains a 422 status code
    if (error.error && typeof error.error === 'object') {
      return this.hasValidationErrors(error.error);
    }
  
    return false;
  }
  

  async caMarche(trip: any) {
    console.log('ca marche', trip);
    this.trips.push(trip);

    // Display a toast when caMarche is called
    await this.presentToast('top');

    this.router.navigate(['/tabs/tab3']);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message?: string) {
    const toast = await this.toastController.create({
      message: message || `The trip "${this.tripTitle}" has been created 🎉`,
      duration: 5000,
      position: position,
    });

    await toast.present();
  }
}
