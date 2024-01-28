import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController, AlertController } from '@ionic/angular';
import { PlacesService } from '../services/places-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PlaceResponse } from '../models/place-response.type';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.page.html',
  styleUrls: ['./add-place.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class AddPlacePage implements OnInit {
  @Input() tripName: string = '';
  @Input() tripId: string = '';
  @ViewChild('placeForm') placeForm!: NgForm;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private placesService: PlacesService,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  closeModal() {
    this.modalController.dismiss();
  }

  addPlace() {
    if (this.placeForm.valid) {
      const formData = this.placeForm.value;
      const place: PlaceResponse = {
        name: formData.name,
        description: formData.description,
        tripId: this.tripId,
        location: {
          type: 'Point',
          coordinates: [formData.X, formData.Y],
        },
      };
  
      this.placesService.postPlace(place).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe({
        next: (createdPlace) => console.log('Place created:', createdPlace),
        error: (err) => {
          if (err.status === 422) {
            // Handle validation error
            this.presentValidationError('The title must be at least 3 characters long and the description must be at least 5 characters long.');
          } else {
            console.log(err);
          }
        },
      });
    } else {
      this.presentAlert();
    }
  }
  
  private async presentValidationError(message: string) {
    const alert = await this.alertController.create({
      header: 'Validation Error',
      message: message,
      buttons: ['OK'],
    });
  
    await alert.present();
  }
  

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Please fill in all required fields correctly.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
