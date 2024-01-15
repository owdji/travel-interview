import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { Point } from 'ol/geom';
import { Geolocation } from 'ol';
import Overlay from 'ol/Overlay';
import { transform } from 'ol/proj';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, CommonModule, IonButton]
})

export class Tab2Page implements OnInit {
  geolocationEnabled = false;
  geolocation: Geolocation;
  marker: HTMLElement | null = null;

  constructor() {
    this.geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: 'EPSG:3857',
    });
  }

  ngOnInit() {
    const map = new Map({
      layers: [new TileLayer({ source: new OSM() })],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    // Update size of map to fix load error
    setTimeout(() => {
      map.updateSize();
    }, 1500);

    this.marker = document.getElementById('marker');

    const mapView = map.getView();

    // Initialize the Geolocation instance
    this.geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: mapView.getProjection(),
    });
  }

  toggleGeolocation() {
    if (this.geolocation) {
      if (!this.geolocationEnabled) {
        console.log('Geolocation enabled');
        // Start tracking the user's position
        this.geolocation.setTracking(true);
      } else {
        console.log('Geolocation disabled');
        // Stop tracking the user's position
        this.geolocation.setTracking(false);
      }
      this.geolocationEnabled = !this.geolocationEnabled;
    }
    
  }
}