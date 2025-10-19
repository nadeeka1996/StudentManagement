  import { bootstrapApplication } from '@angular/platform-browser';
  import { AppComponent } from './app/app.component';
  import { provideRouter } from '@angular/router';
  import { routes } from './app/app.routes';
  import { provideHttpClient, withInterceptors } from '@angular/common/http';
  import { authInterceptor } from './app/core/services/auth/auth.interceptor';
  import { importProvidersFrom } from '@angular/core';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  
  bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes),
      provideHttpClient(withInterceptors([authInterceptor])),
      // Ensure Angular Material overlays and datepickers work
      importProvidersFrom(BrowserAnimationsModule),
    ],
  });