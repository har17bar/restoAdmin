import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders , HttpResponse } from '@angular/common/http';
import {Observable, of } from 'rxjs';
import {Response, RequestOptions, Headers , Http} from '@angular/http';

import {AuthService} from './auth/auth.service';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  private serverUrl = 'http://192.168.5.97:3000';
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getAllRestourants(id): Observable<any> {
    const url = `${this.serverUrl}/admin/resto/getRestos`;
    return this.http.post<any>(url, {token: localStorage.getItem('token'), query: {admin: id}}).pipe(
      shareReplay()
    );
  }
}


/*
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
private httpHeaders = new RequestOptions({
      headers: new Headers({'token': localStorage.getItem('id_token')})
    });



   private setHttpHeaders = {
      headers: this.createAuthorizationHeader()
   };

     private createAuthorizationHeader() {
       const headers = new HttpHeaders();
       headers.set('token', localStorage.getItem('token'));
       return headers;
     }
*/

