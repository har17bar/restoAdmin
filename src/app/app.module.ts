import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AnyComponentComponent } from './any-component/any-component.component';
import { AdminComponent } from './admin_side/admin/admin.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AddRoomComponent } from './admin_side/add-room/add-room.component';
import { RoomDetailComponent } from './admin_side/room-detail/room-detail.component';
import {ServiceComponent} from './admin_side/service/service.component';
import { AddServiceComponent } from './admin_side/add-service/add-service.component';
import { ServiceDetailComponent } from './admin_side/service-detail/service-detail.component';
import { HotelComponent } from './admin_side/hotel/hotel.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminSettingsComponent } from './admin_side/admin-settings/admin-settings.component';
import {MyHttpInterceptor} from './my-http-interceptor';
import {AuthService} from './auth/auth.service';
import {AdminService} from './admin.service';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { AdminNavbarComponent } from './admin_side/admin-navbar/admin-navbar.component';
import {MyRequestOptions} from './my-request-options';
import { RequestOptions } from '@angular/http';
import { MainComponent } from './client_side/main/main.component';
import { ClientRoomDetailComponent } from './client_side/client-room-detail/client-room-detail.component';
import { ClientServiceDetailComponent } from './client_side/client-service-detail/client-service-detail.component';
import { BookingComponent } from './client_side/booking/booking.component';

import { MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookingHistoryComponent } from './admin_side/booking-history/booking-history.component';
import { RegisterComponent } from './auth/register/register.component';

@NgModule({
   declarations: [
      AppComponent,
      PageNotFoundComponent,
      AnyComponentComponent,
      AdminComponent,
      AddRoomComponent,
      RoomDetailComponent,
      ServiceComponent,
      AddServiceComponent,
      ServiceDetailComponent,
      HotelComponent,
      LoginComponent,
      AdminSettingsComponent,
      AdminNavbarComponent,
      MainComponent,
      ClientRoomDetailComponent,
      ClientServiceDetailComponent,
      BookingComponent,
      BookingHistoryComponent,
      RegisterComponent
   ],
   imports: [
        BrowserModule.withServerTransition({appId: 'my-app'}),
        SlimLoadingBarModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
   providers: [
    AdminService,
    AuthService,
    //  {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: MyHttpInterceptor,
    //   multi: true
    // },
    {provide: RequestOptions, useClass: MyRequestOptions},
    MatDatepickerModule
   ],
   bootstrap: [AppComponent]
})


export class AppModule { }
