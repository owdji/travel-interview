import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { PlaceService } from '../services/places-service.service';
// import { Place } from '../models/place.type';
import { PlaceResponse } from '../models/place-response.type';
import { TripResponse } from '../models/trip-response.type';
import { TripService } from '../services/trips-service.service';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { PlacesService } from '../services/places-service.service';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.page.html',
  styleUrls: ['./add-place.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AddPlacePage implements OnInit {

  @Input() tripName: string = '';
  @Input() tripId: string = '';
  @ViewChild('placeForm') placeForm!: NgForm;

  constructor(
    private PlacesService: PlacesService,
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  closeModal() {
    this.modalController.dismiss();
  }

  addPlace() {
    if (this.placeForm.valid) {
      const formData = this.placeForm.value;
      console.log('TRIP ID', this.tripId);

      //transforming the data to a PlaceResponse
      const place: PlaceResponse = {
        name: formData.name,
        description: formData.description,
        tripId: this.tripId,
        location: {
          type: 'Point',
          coordinates: [formData.X, formData.Y],
        },
      };

      console.log('PLACE BEFORE SEND', place)

      console.log('Place:', place);
      this.PlacesService.postPlace(place).subscribe({
        next: (place) => console.log('Place created:', place),
        error: (err) => console.log(err),
      });
    } else {
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Please fill in all required fields correctly.',
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
  }

}

