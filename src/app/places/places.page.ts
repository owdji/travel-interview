import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlaceResponse } from '../models/place-response.type';
import { PlacesService } from '../services/places-service.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PlacesPage implements OnInit {
  places: PlaceResponse[];

  constructor(private placeService: PlacesService) {
    this.places = [];
   }

   getPlaces() {
    this.placeService.getPlaces().subscribe({
      next: (places) => (this.places = places),
      error: (err) => console.log(err),
    });
  }

  ngOnInit() {
    this.getPlaces();
  }

}
