import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// environment
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';

// Root entry
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// guards
import * as fromGuards from './guards';

// services
import * as fromServices from './services';

// store
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from './store/effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { CustomSerializer } from './store/reducers/';

// components
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DemoMaterialModule } from './material-module';
import { SliderComponent } from './ui/slider/slider.component';
import { HomeComponent } from './ui/home/home.component';
import { LoginComponent } from './ui/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([...Effects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    ...fromServices.services,
    ...fromGuards.guards,
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
