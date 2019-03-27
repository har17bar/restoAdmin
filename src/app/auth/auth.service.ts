import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {tap, delay , shareReplay, map } from 'rxjs/operators';
import {HttpClient, HttpHeaders , HttpResponse } from '@angular/common/http';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string;
  constructor(private http: HttpClient) { }

  login(admin): Observable<any> {
    return this.http.post<any>('http://192.168.5.97:3000/admin/login', admin);
  }
  register(data): Observable<any> {
    return  this.http.post<any>('http://192.168.5.97:3000/admin/register', data)
  }
  updateUser(data): Observable<any> {
    return this.http.put<any>('http://192.168.5.97:3000/admin/verifyUser', data).pipe(shareReplay());

  }
  private setSession(authResult) {}
  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
  public getToken() {
    return localStorage.getItem('id_token');
  }
}
