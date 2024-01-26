import { Component, OnInit } from '@angular/core';
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
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, CommonModule, IonButton],
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
})

export class Tab2Page implements OnInit {
  places: PlaceResponse[];
  geolocationEnabled = false;
  geolocation: Geolocation;
  marker: HTMLElement | null = null;
  map: Map;
  toggleButtonText = 'Activate Geolocation';

  constructor(private placesService: PlacesService) {
    this.places = [];
    this.map = new Map({
      layers: [new TileLayer({ source: new OSM() })],
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
      layers: [new TileLayer({ source: new OSM() })],
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
      this.map.getView().setZoom(12); // Ajustez la valeur de zoom selon vos besoins
      this.addMarker();
    }
  };
  
  onChangeTracking = () => {
    if (!this.geolocation.getTracking()) {
      // Si le suivi est désactivé, retirer le marqueur de la carte
      this.removeMarker();
      // Retirer les gestionnaires d'événements
      this.geolocation.un('change:position', this.onChangePosition);
      this.geolocation.un('change:tracking', this.onChangeTracking);
    }
  };
  
  toggleGeolocation() {
    if (this.geolocation) {
      if (!this.geolocationEnabled) {
        console.log('Activation de la géolocalisation');
        this.geolocation.setTracking(true);
  
        // Ajouter un événement pour détecter le changement de position
        this.geolocation.on('change:position', this.onChangePosition);
  
        // Ajouter un événement pour détecter le changement d'état de la géolocalisation
        this.geolocation.on('change:tracking', this.onChangeTracking);
  
        // Mettre à jour le texte du bouton
        this.toggleButtonText = 'Desactivate Geolocation';
  
      } else {
        console.log('Désactivation de la géolocalisation');
        this.geolocation.setTracking(false);
  
        // Retirer le marqueur de la carte
        this.removeMarker();
  
        // Retirer les gestionnaires d'événements
        this.geolocation.un('change:position', this.onChangePosition);
        this.geolocation.un('change:tracking', this.onChangeTracking);
  
        // Mettre à jour le texte du bouton
        this.toggleButtonText = 'Activate Geolocation';
      }
  
      this.geolocationEnabled = !this.geolocationEnabled;
    }
  }
  
  
  removeMarker() {
    if (this.marker) {
      const markerOverlay = this.map.getOverlayById('marker');
      if (markerOverlay) {
        this.map.removeOverlay(markerOverlay);
      }
      this.marker.innerHTML = ""; // Réinitialiser le marqueur
      console.log('Marker removed successfully.');
    }
  }
    

  addMarker() {
    console.log('Entering addMarker function');
  
    if (this.geolocation) {
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
  
      this.marker = marker;

      console.log('Adding marker at coordinates:', coordinates);
      console.log('Marker element:', marker);

  
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
      const image = place.pictureUrl;

      const marker = document.createElement('div');
      marker.setAttribute('class', 'place-marker');
      marker.style.width = '70px';
      marker.style.height = '70px';
      marker.style.backgroundImage = `url(${image})`;
      marker.style.backgroundSize = 'cover';
      marker.style.borderRadius = '50%';
      marker.style.border = '2px solid #fff';

      //Faudra changer avec le lien de la page du lieu
      marker.addEventListener('click', () => {
        window.location.href = `/tabs/tab2/places/${place.id}`;
      });
      console.log('image added', marker);

      const overlay = new Overlay({
        element: marker,
        positioning: 'center-center',
        stopEvent: false,
        offset: [0, 0],
      });
  
      overlay.setPosition(coordinates);
      this.map.addOverlay(overlay);
  
      console.log('Marker and overlay added successfully.');
    } else {
      console.log('Geolocation is not initialized.');
    }
  }
  
  addPlaceMarker(place: PlaceResponse) {
    if (place && place.location && place.location.coordinates) {
      const coordinates = place.location.coordinates;
  
      const marker = document.createElement('div');
      marker.setAttribute('class', 'place-marker');
      marker.innerHTML = '🏞️';
  
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