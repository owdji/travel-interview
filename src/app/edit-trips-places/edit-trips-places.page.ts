import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-edit-trips-places',
  templateUrl: './edit-trips-places.page.html',
  styleUrls: ['./edit-trips-places.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EditTripsPlacesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
