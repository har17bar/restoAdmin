import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnyComponentComponent } from './any-component/any-component.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin_side/admin/admin.component';
import { AddRoomComponent } from './admin_side/add-room/add-room.component';
import {RoomDetailComponent} from './admin_side/room-detail/room-detail.component';
import {ServiceComponent} from './admin_side/service/service.component';
import {RegisterComponent} from './auth/register/register.component';
import { AddServiceComponent } from './admin_side/add-service/add-service.component';
import {ServiceDetailComponent} from './admin_side/service-detail/service-detail.component';
import { HotelComponent } from './admin_side/hotel/hotel.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminSettingsComponent } from './admin_side/admin-settings/admin-settings.component';
import {AuthGuard} from './auth/auth.guard';

// **************************************************
import {MainComponent} from './client_side/main/main.component';
import {ClientRoomDetailComponent} from './client_side/client-room-detail/client-room-detail.component';
import {ClientServiceDetailComponent} from './client_side/client-service-detail/client-service-detail.component';
import { BookingHistoryComponent } from './admin_side/booking-history/booking-history.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'any', component: AnyComponentComponent},
  {path: 'registration', component: RegisterComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'admin/add-room', component: AddRoomComponent, canActivate: [AuthGuard]},
  {path: 'admin/room-detail/:id', component: RoomDetailComponent,  canActivate: [AuthGuard]},
  {path: 'admin/services', component: ServiceComponent, canActivate: [AuthGuard]},
  {path: 'admin/services/add-service', component: AddServiceComponent, canActivate: [AuthGuard]},
  {path: 'admin/services/service-detail/:id', component: ServiceDetailComponent, canActivate: [AuthGuard]},
  {path: 'admin/hotel', component: HotelComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'admin/settings', component: AdminSettingsComponent, canActivate: [AuthGuard]},
  {path: 'booking/history', component: BookingHistoryComponent, canActivate: [AuthGuard]},
  // *******************************
  {path: 'home', component: MainComponent},
  {path: 'home/room-detail/:id', component: ClientRoomDetailComponent},
  {path: 'home/services/service-detail/:id', component: ClientServiceDetailComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

