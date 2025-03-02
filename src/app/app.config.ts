import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from './core/interseptors/headers/headers.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { spinnerInterceptor } from './core/interseptors/headers/spinner/spinner.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes,withViewTransitions()),
     provideClientHydration(),
    provideHttpClient(withFetch(),withInterceptors([headersInterceptor , spinnerInterceptor])),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(NgxSpinnerModule)
    ]
};
