import { Component, OnDestroy, OnInit } from '@angular/core';
import { Geolocation } from 'ol';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import Overlay from 'ol/Overlay';
import { transform } from 'ol/proj';
import { useGeographic } from 'ol/proj';
import { PlacesService } from '../services/places-service.service';
import { PlaceResponse } from '../models/place-response.type';
import Feature from 'ol/Feature';
import { Cluster, Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Icon, Stroke, Style, Text } from 'ol/style';
import { LineString, Point, Polygon } from 'ol/geom';
import { createEmpty, extend, getWidth, getHeight } from 'ol/extent';
import { fromLonLat } from 'ol/proj';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, CommonModule, IonButton],
  standalone: true,
})


export class Tab2Page implements OnInit {
  places: PlaceResponse[];
  geolocationEnabled = false;
  geolocation: Geolocation;
  marker: HTMLElement | null = null;
  map: Map;
  markerOverlay: Overlay | null = null;
  toggleButtonText = 'Activate Geolocation';
  vectorLayer: VectorLayer<VectorSource>;
  vectorSource: VectorSource;

  constructor(private placesService: PlacesService) {
    this.places = [];
    this.vectorSource = new VectorSource();
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
    });
    this.map = new Map({
      layers: [new TileLayer({ source: new OSM() }), this.vectorLayer], // Add vectorLayer to the layers
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
    this.geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: 'EPSG:3857',
    });
  }

  getPlaces() {
    this.placesService.getPlaces().subscribe({
      next: (places) => {
        this.places = places;
        places.forEach(place => this.addPlaceMarker(place));
      },
      error: (err) => console.log(err),
    });
  }

  ngOnInit() {
    useGeographic();
    this.getPlaces();

    this.map = new Map({
      controls: [],
      layers: [new TileLayer({ source: new OSM() }), this.vectorLayer],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    // Update size of map to fix load error
    setTimeout(() => {
      this.map.updateSize();
    }, 1500);

    const mapView = this.map.getView();

    // Initialize the Geolocation instance
    this.geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true,
      },
    });

    this.addMarker();
  }

  onChangePosition = () => {
    const coordinates = this.geolocation.getPosition();
    if (coordinates) {
      this.map.getView().setCenter(coordinates);
      this.map.getView().setZoom(12);
      this.addMarker();
    }
  };

  onChangeTracking = () => {
    if (!this.geolocation.getTracking()) {
      this.removeMarker();
      this.geolocation.un('change:position', this.onChangePosition);
      this.geolocation.un('change:tracking', this.onChangeTracking);
    }
  };

  toggleGeolocation() {
    if (this.geolocation) {
      if (!this.geolocationEnabled) {
        console.log('Activation de la géolocalisation');
        this.geolocation.setTracking(true);

        this.geolocation.on('change:position', this.onChangePosition);
        this.geolocation.on('change:tracking', this.onChangeTracking);

        this.toggleButtonText = 'Desactivate Geolocation';
      } else {
        console.log('Désactivation de la géolocalisation');
        this.geolocation.setTracking(false);

        this.removeMarker();

        this.geolocation.un('change:position', this.onChangePosition);
        this.geolocation.un('change:tracking', this.onChangeTracking);

        this.toggleButtonText = 'Activate Geolocation';
      }

      this.geolocationEnabled = !this.geolocationEnabled;
    }
  }

  removeMarker() {
    if (this.markerOverlay) {
      this.map.removeOverlay(this.markerOverlay);
      this.markerOverlay = null; // Réinitialise la variable
      console.log('Marker removed successfully.');
    }
  }

  addMarker() {
    if (this.geolocationEnabled) { // Vérifier si la géolocalisation est activée
      if (this.markerOverlay) {
        // Si un overlay existe déjà, le supprimer
        this.map.removeOverlay(this.markerOverlay);
      }
  
      if (this.geolocation.getAccuracy() === undefined) {
        console.log('Position not yet available. Try again.');
        return;
      }
  
      const coordinates = this.geolocation.getPosition();
  
      if (!coordinates) {
        console.log('Unable to get current position.');
        return;
      }
  
      console.log('Adding marker at coordinates:', coordinates);
  
      const marker = document.createElement('div');
      marker.setAttribute('id', 'marker');
      marker.setAttribute('class', 'marker');
      marker.innerHTML = '📍';
  
      console.log('Adding marker at coordinates:', coordinates);
  
      this.markerOverlay = new Overlay({
        element: marker,
        positioning: 'center-center',
        stopEvent: false,
        offset: [0, 0],
      });
  
      this.markerOverlay.setPosition(coordinates);
      this.map.addOverlay(this.markerOverlay);
  
      console.log('Marker and overlay added successfully.');
    } else {
      console.log('Geolocation is not activated.');
    }
  }
  

  addPlaceMarker(place: PlaceResponse) {
    if (place && place.location && place.location.coordinates) {
      const coordinates = place.location.coordinates;
      const image = place.pictureUrl || 'https://ik.imagekit.io/demo/medium_cafe_B1iTdD0C.jpg';
  
      const marker = document.createElement('div');
      marker.setAttribute('class', 'place-marker');
      marker.style.width = '70px';
      marker.style.height = '70px';
      marker.style.backgroundImage = `url(${image})`;
      marker.style.backgroundSize = 'cover';
      marker.style.borderRadius = '50%';
      marker.style.border = '2px solid #fff';
  
      // Faudra changer avec le lien de la page du lieu
      marker.addEventListener('click', () => {
        window.location.href = `/tabs/tab3/places/${place.id}`;
      });
  
      const overlay = new Overlay({
        element: marker,
        positioning: 'center-center',
        stopEvent: false,
        offset: [0, 0],
      });
  
      overlay.setPosition(coordinates);
      this.map.addOverlay(overlay);
    }
  }  
}