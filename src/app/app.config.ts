import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

import { routes } from './app.routes';
import { provideStore } from '@ngxs/store';
import { AddressState } from './state/address-search-bar/address.state';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { StreetMapState } from './state/street-map/street-map.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore([AddressState, StreetMapState])
  ]
};
