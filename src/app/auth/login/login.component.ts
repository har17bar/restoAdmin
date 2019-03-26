import { Component, OnInit , Input} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import * as response from '../../../../response.js';
import {shareReplay, tap} from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //  @Input() admin = {
  //   username: '',
  //   password: ''
  // };
  constructor(private authService: AuthService, private router: Router) { }
  boolForLogin = 'phone';
  phone = null;
  who = null;
  ngOnInit() {

  }
  loginWithPhone(phone: string): void {
    this.authService.login({
    'object': {phone: phone}
    }).subscribe(result => {
      console.log(result);
      if (result.redirect === response.redirect.set_password) {
        this.phone = phone;
        this.who = result.data._id;
        this.boolForLogin = 'setP';
      } else if (result.redirect === response.redirect.send_password) {
        this.phone = phone;
        this.boolForLogin = 'sentP';
      }
      if (result.success) {
        // this.router.navigate(['/admin', {authorized: 'true'}]);
      } else {
        console.log('Could Not Login We Had Trouble');
      }
    }, error => {
      console.log('Could Not Login We Had Trouble', error.error);
    });
  }
  registersP( password: string, re_password: string) {
    console.log(this.who)
    this.authService.updateUser({
      'query': {member_id: this.who},
      'object': {password: password, re_password: re_password, fb_id: 'esim'}
    }).subscribe(result => {
      if (result.success) {
        console.log('success');
        // this.router.navigate(['/admin', {authorized: 'true'}]);
      } else {
        console.log('Could Not Login We Had Trouble');
      }
    }, error => {
      console.log('Could Not Login We Had Trouble', error.error);
    });
  }
  loginWithPassword(password: string): void {
    this.authService.login({
      'object': {phone: this.phone, password: password}
    }).subscribe(result => {
      console.log(result);
      if (result.success) {
        localStorage.setItem('token', result.token);
       // this.router.navigate(['/admin', {authorized: 'true'}]);
      } else {
        console.log('Could Not Login We Had Trouble');
      }
    }, error => {
      console.log('Could Not Login We Had Trouble', error.error);
    });
  }

}

