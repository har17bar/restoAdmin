import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCg_b9BzasyRI7WuFYvAPvIvGA4PRszRNI",
  authDomain: "resto-328bc.firebaseapp.com",
  databaseURL: "https://resto-328bc.firebaseio.com",
  projectId: "resto-328bc",
  storageBucket: "resto-328bc.appspot.com",
  messagingSenderId: "1074798062472"
};
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

/*class PhoneNumber {
  country: string;
  area: string;
  prefix: string;
  line: string;
  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.area + this.prefix + this.line
    return `+${num}`;
  }
}*/

export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService) { }
  windowRef: any;
  phoneNumber: string;
  verificationCode: string;
  user: any;

  ngOnInit() {
    this.windowRef = window;
    console.log( this.windowRef);
    firebase.initializeApp(config);
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.windowRef.recaptchaVerifier.render();

  }
  sendLoginCode(phone: string) {
    const appVerifier = this.windowRef.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phone, appVerifier)
      .then(result => {
        this.windowRef.confirmationResult = result;
      })
      .catch( error => console.log(error) );
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then( result => {
        this.user = result.user;
      })
      .catch( error => console.log(error, 'Incorrect code entered?'));
  }


  /* register(name: String, phone: String, password: String, re_password: String, fb_id: String){

     this.authService.register({object:{
         name: name,
         phone: phone,
         password: password,
         re_password: re_password,
         fb_id: fb_id
       }}).subscribe(result=> {

     }, error =>{

     })
   }*/
}
