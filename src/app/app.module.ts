import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from './components/admin/admin.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import {MyHttpInterceptor} from './my-http-interceptor';
import {AuthService} from './auth/auth.service';
import {AdminService} from './admin.service';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import {MyRequestOptions} from './my-request-options';
import { RequestOptions } from '@angular/http';




import { MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RegisterComponent } from './auth/register/register.component';

@NgModule({
   declarations: [
      AppComponent,
      PageNotFoundComponent,
      AdminComponent,
      LoginComponent,
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
