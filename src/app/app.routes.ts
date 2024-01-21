import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'add-place',
    loadComponent: () => import('./add-place/add-place.page').then( m => m.AddPlacePage)
  },
  {
    path: 'add-trip',
    loadComponent: () => import('./add-trip/add-trip.page').then( m => m.AddTripPage)
  },
  {
    path: 'edit-trips-places',
    loadComponent: () => import('./edit-trips-places/edit-trips-places.page').then( m => m.EditTripsPlacesPage)
  },
  {
    path: 'places',
    loadComponent: () => import('./places/places.page').then( m => m.PlacesPage)
  },
];
