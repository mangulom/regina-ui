import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { defineCustomElements } from 'aquarius-controls/loader';
import { provideServiceWorker } from '@angular/service-worker';
import { environment } from './environments/environment';
import { appConfig } from './app/app.config'; // tu configuración adicional si es que tiene providers, imports, etc.

bootstrapApplication(AppComponent, {
  ...appConfig, // spread de tu configuración existente
  providers: [
    ...(appConfig.providers || []), // mantener otros providers si los tienes
    ...(environment.production ? [provideServiceWorker('ngsw-worker.js')] : []),
  ],
})
  .catch((err) => console.error(err));

defineCustomElements(window);
