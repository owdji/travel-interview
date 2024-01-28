import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { onlyAuthenticated } from "./security/only-authenticated.guard";

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    canActivate: [onlyAuthenticated]
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
    loadComponent: () => import('./add-place/add-place.page').then( m => m.AddPlacePage),
    canActivate: [onlyAuthenticated]
  },
  {
    path: 'add-trip',
    loadComponent: () => import('./add-trip/add-trip.page').then( m => m.AddTripPage),
    canActivate: [onlyAuthenticated]
  },
  {
    path: 'places',
    loadComponent: () => import('./places/places.page').then( m => m.PlacesPage),
    canActivate: [onlyAuthenticated]
  },
  {
    path: 'edit-trip',
    loadComponent: () => import('./edit-trip/edit-trip.page').then( m => m.EditTripPage)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }