import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import {RegisterComponent} from './auth/register/register.component';

import { LoginComponent } from './auth/login/login.component';
import {AuthGuard} from './auth/auth.guard';

// **************************************************


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegisterComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  // *******************************
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

