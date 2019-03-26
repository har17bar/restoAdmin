import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders , HttpResponse } from '@angular/common/http';
import {Observable, of } from 'rxjs';
import {Room} from './Room';
import {Response, RequestOptions, Headers , Http} from '@angular/http';
import { Service } from './Service';
import {Hotel} from './Hotel';
import { Admin } from './Admin';
import {AuthService} from './auth/auth.service';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private serverUrl = 'http://localhost:4000';


  private httpHeaders = new RequestOptions({
    headers: new Headers({'token': localStorage.getItem('id_token')})
  });
  private setHttpHeaders = {
    headers: this.createAuthorizationHeader()
  };

  private createAuthorizationHeader() {
    const headers = new HttpHeaders();
    const idToken = localStorage.getItem('id_token');
    console.log('IdToken:', idToken);
    headers.set('token', localStorage.getItem('id_token'));
    return headers;
  }
  constructor(private http: HttpClient, private authService: AuthService) {
   }
// Rooms Managment *******************
  getAllRooms(): Observable<Room[]> {
    const url = `${this.serverUrl}/admin/getallrooms`;
    return this.http.get<Room[]>(url).pipe(
      shareReplay()
      );
  }

  addRoom(room): Observable<any> {
    const url = `${this.serverUrl}/admin/addRoom`;
    // console.log('room: ', room);
    return this.http.post<Room>(url, room , this.setHttpHeaders).pipe(
      shareReplay()
      );
  }
  getRoom(id: string): Observable<any> {
    const url = `${this.serverUrl}/admin/roomDetail/${id}`;
    return this.http.get<any>(url, this.setHttpHeaders).pipe(
      shareReplay()
      );
  }

  updateRoom(room: Room): Observable<any> {
    const url = `${this.serverUrl}/admin/roomDetail`;
    // console.log('updatable room:', room);
    return this.http.put<any>(url, room, this.setHttpHeaders).pipe(
      shareReplay()
      );
  }

  deleteRoom(id): Observable<any> {
    // console.log('room id:', id);
    const url = `${this.serverUrl}/admin/deleteRoom/${id}`;
    return this.http.delete<any>(url, this.setHttpHeaders).pipe(
      shareReplay()
      );

  }
  uploadRoomImages(formData): Observable<any> {
    const url = `${this.serverUrl}/admin/uploadRoomImage`;
    return this.http.post(url, formData, this.setHttpHeaders).pipe(
      shareReplay()
      );
  }
  deleteRoomImageFile(img): Observable<any> {
    const url = `${this.serverUrl}/admin/deleteRoomImageFile`;
    return this.http.post(url, {FileName: img}, this.setHttpHeaders).pipe(
      shareReplay()
      );
  }
// *******************************************************************


// Services Managment ****************************************************

  getAllServices(): Observable<Service[]> {
    const url = `${this.serverUrl}/admin_services/services`;
    return this.http.get<Service[]>(url, this.setHttpHeaders).pipe(
      shareReplay()
      );
  }

  addService(service): Observable<any> {
    const url = `${this.serverUrl}/admin_services/addService`;
    // console.log('service: ', service);
    return this.http.post<Service>(url, service , this.setHttpHeaders).pipe(
      shareReplay()
      );
  }

  getService(id: string): Observable<any> {
    const url = `${this.serverUrl}/admin_services/serviceDetail/${id}`;
    return this.http.get<any>(url, this.setHttpHeaders).pipe(
      shareReplay()
      );
  }


  updateService(service: Service): Observable<any> {
    const url = `${this.serverUrl}/admin_services/serviceDetail/updateService`;
    // console.log('updatable service:', service);
    return this.http.put<any>(url, service, this.setHttpHeaders).pipe(
      shareReplay()
      );
  }

  deleteService(id): Observable<any> {
    // console.log('service id:', id);
    const url = `${this.serverUrl}/admin_services/serviceDetail/deleteService/${id}`;
    return this.http.delete<any>(url, this.setHttpHeaders).pipe(
      shareReplay()
      );

  }

  uploadServiceImages(formData): Observable<any> {

    const url = `${this.serverUrl}/admin_services/uploadServiceImage`;
    return this.http.post(url, formData, this.setHttpHeaders).pipe(
      shareReplay()
      );
  }
  deleteServiceImageFile(img): Observable<any> {
    const url = `${this.serverUrl}/admin_services/deleteServiceImageFile`;
    return this.http.post(url, {FileName: img}, this.setHttpHeaders).pipe(
      shareReplay()
      );
  }

// Hotel Managment*******************************************

  getHotel(): Observable<any> {
    const url = `${this.serverUrl}/admin_hotel/getHotel`;
    return this.http.get<Hotel>(url, this.setHttpHeaders).pipe(
      shareReplay()
      );
  }
  updateHotel(hotel: Hotel): Observable<any> {
    const url = `${this.serverUrl}/admin_hotel/getHotel/updateHotel`;
    // console.log('updatable hotel:', hotel);
    return this.http.put<any>(url, hotel, this.setHttpHeaders).pipe(
      shareReplay()
      );
  }
  upload(formData): Observable<any> {
    const url = `${this.serverUrl}/admin_hotel/upload`;
    return this.http.post(url, formData, this.setHttpHeaders).pipe(
      shareReplay()
      );
  }
  deleteFile(img): Observable<any> {
    const url = `${this.serverUrl}/admin_hotel/deleteFile`;
    return this.http.post(url, {FileName: img}, this.setHttpHeaders).pipe(
      shareReplay()
      );
  }


// Admin Settings *********************************************
  updateAdminCreds(admin): Observable<any> {
    const url = `${this.serverUrl}/settings/updateCreds`;
    return this.http.put<any>(url, admin, this.setHttpHeaders).pipe(
      shareReplay()
      );
  }



// Bookings**************************************************

getAllBookings(): Observable<any> {
  const url = `${this.serverUrl}/booking/booking-history`;
  return this.http.get<any>(url).pipe(
    shareReplay()
    );
}
  private extractData(res: Response) {
    const body = res.json();
    return body || {};
}


}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

