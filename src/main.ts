import { enableProdMode, importProvidersFrom } from '@angular/core';

import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { IonicStorageModule } from "@ionic/storage-angular";
// import { provideHttpClient } from '@angular/core';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(IonicStorageModule.forRoot()),
  ],
});
