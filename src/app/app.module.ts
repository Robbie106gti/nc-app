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
import { AppEffects } from './store/effects/app.effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';

// components
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DemoMaterialModule } from './material-module';
import { SliderComponent } from './ui/slider/slider.component';
import { ProfileComponent } from './users/profile/profile.component';
import { UsersComponent } from './users/users/users.component';
import { HomeComponent } from './ui/home/home.component';
import { LoginComponent } from './users/login/login.component';
import { LogoutComponent } from './users/logout/logout.component';
import { InboxComponent } from './users/inbox/inbox.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    ProfileComponent,
    UsersComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    InboxComponent
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
    EffectsModule.forRoot([AppEffects]),
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
