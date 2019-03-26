import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {HttpClient, HttpHeaders , HttpResponse } from '@angular/common/http';
import * as $ from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;
    return this.checkLogin(url);
    // return true;
  }
  poster(authorized): void {
    $.post({
      url: 'http://localhost:4000/login/isAutoried',
      data: {token: localStorage.getItem('id_token')},
      success: function(result) {
        if (result.success === true ) {
          console.log('passed');
          authorized.is = true;
          return true;
        } else {
          authorized.is = false;
          return false;
        }
      },
      async: false
    });
  }
  sleep(miliseconds) {
    const currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {
    }
  }
  checkLogin(url: string): boolean {
    let authorized = {
      is: false
    };
    this.poster(authorized);
    console.log('authorized:', authorized.is);
   if (authorized.is === true && this.authService.isLoggedIn()) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Create a dummy session id
    const sessionId = 123456789;

    // Set our navigation extras object
    // that contains our global query params and fragment
    const navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': sessionId },
      fragment: 'anchor'
    };

    // Navigate to the login page with extras
    this.router.navigate(['/login'], navigationExtras);
    return false;
  }
}
