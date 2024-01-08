import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.page.html',
  styleUrls: ['./add-place.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AddPlacePage implements OnInit {
  @ViewChild('presentAlert', { static: false }) presentAlert: HTMLIonAlertElement | undefined;

  constructor() { }

  ngOnInit() {
  }

  async onCreatePlace(placeForm: any) {
    if (placeForm.valid) {
      const formData = placeForm.value;
      console.log('Form Data:', formData);
      // Here, you can perform further actions with the form data, like sending it to a service or API
    } else {
      // Handle invalid form data by showing the custom alert if presentAlert is defined
      if (this.presentAlert) {
        await this.presentAlert.present();
      }
    }
  }

}
