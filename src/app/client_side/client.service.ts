import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders , HttpResponse } from '@angular/common/http';
import {Observable, of } from 'rxjs';
import {Room} from '../Room';
import {Response, RequestOptions, Headers , Http} from '@angular/http';
import { Service } from '../Service';
import {Hotel} from '../Hotel';
import { Admin } from '../Admin';
import {AuthService} from '../auth/auth.service';
import {shareReplay} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private serverUrl = 'http://localhost:4000';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllRooms(): Observable<Room[]> {
    const url = `${this.serverUrl}/admin/getallrooms`;
    return this.http.get<Room[]>(url).pipe(
      shareReplay()
      );
  }
  getRoom(id: string): Observable<any> {
    const url = `${this.serverUrl}/admin/roomDetail/${id}`;
    return this.http.get<any>(url).pipe(
      shareReplay()
      );
  }

  getAllServices(): Observable<Service[]> {
    const url = `${this.serverUrl}/admin_services/services`;
    return this.http.get<Service[]>(url).pipe(
      shareReplay()
      );
  }

  getService(id: string): Observable<any> {
    const url = `${this.serverUrl}/admin_services/serviceDetail/${id}`;
    return this.http.get<any>(url).pipe(
      shareReplay()
      );
  }
  getHotel(): Observable<any> {
    const url = `${this.serverUrl}/admin_hotel/getHotel`;
    return this.http.get<Hotel>(url).pipe(
      shareReplay()
      );
  }

  check(booking): Observable<any> {
    const url = `${this.serverUrl}/booking`;
    return this.http.post<any>(url, {booking: booking}).pipe(
      shareReplay()
      );
    }
  register(fname, lname, email): Observable<any> {
    const url = `${this.serverUrl}/booking/register`;
    return this.http.post<any>(url, {fname: fname, lname: lname, email: email}).pipe(
      shareReplay()
      );
  }
  sendCode(data): Observable<any> {
    const url = `${this.serverUrl}/booking/sendCode`;
    return this.http.post<any>(url, data).pipe(
      shareReplay()
      );
  }
}
