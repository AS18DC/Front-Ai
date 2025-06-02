// src/app/app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Importa tus rutas
import { provideClientHydration } from '@angular/platform-browser'; // Puede que ya esté
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown'; // Import MarkdownModule

// Si necesitas HttpClient (común para APIs):
// import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Configura el enrutador con tus rutas
    provideClientHydration(), // Puede que ya esté para SSR/Hydration
    provideHttpClient(),
    importProvidersFrom(MarkdownModule.forRoot()
    )
  ]
};