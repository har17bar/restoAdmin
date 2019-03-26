import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {ClientService} from '../client.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  public showRegister = false;
  public showBooking = true;
  public showPassCode = false;
  public p_code = true;
  private getDate = new Date();
  public date = new FormControl(new Date());
  public date1 = new FormControl(this.getDate);
  public serializedDate = new FormControl((new Date()).toISOString());
  public nights = null;
  public prise = null;

  private from: string;
  private to: string;
  private code: string;
  private email: string;
  myFilter = (d: Date): boolean => {
     this.getDate.setDate(this.date.value.getDate() + 1);
     this.getDate.setMonth(this.date.value.getMonth());
     this.getDate.setFullYear(this.date.value.getFullYear());
    this.date1 = new FormControl(this.getDate);

    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();

    const current = new Date();

    return year >= current.getFullYear();
  }
  myFilter1 = (d: Date): boolean => {
    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    const current = new Date();

    return  year >= current.getFullYear();
  }
  constructor(private service: ClientService) {
  }

  ngOnInit() {
  }
  book(_from, _to): void {
    localStorage.setItem('checked', 'true');
    const room_id = localStorage.getItem('room_id');
    // console.log('From:', _from);
    // console.log('To:', _to);
    // const checkDateFrom = _from.split('/');
    // const checkDateTo = _to.split('/');

    // console.log(checkDateFrom[2]);
    // console.log(checkDateTo[2]);

    this.service.check({from: _from, to: _to, roomId: room_id }).subscribe(data => {
      if (data.success) {
        // localStorage.setItem('book_id', data.booking_id);
        // localStorage.setItem('from', _from);
        // localStorage.setItem('to', _to);
        this.from = _from;
        this.to = _to;
        this.showBooking = false;
        this.showRegister = true;
        console.log('nights:', data.nights);
        console.log('prise:', data.prise, '$');
        this.nights = data.nights;
        this.prise = data.prise;
        alert('Done');
      } else {
        alert(data);
      }
    });
    // console.log(checkDateFrom[1] + ' ' + checkDateTo[1]);
  }
  register(fname, lname, email) {
    this.service.register(fname, lname, email).subscribe(data => {
      if (data.code) {
        this.showRegister = false;
        this.showPassCode = true;
        this.code = data.code;
        this.email = email;
        console.log('code:', data.code);
        alert('We Sent You a Verification Code To Your Email. Check It And Sand Me');
      } else {
        alert(data);
      }
    });
  }
  sendCode(code) {
    if (code === this.code) {
      this.p_code = false;
      const data = {

        email: this.email,
        from: this.from,
        to: this.to,
        room_id: localStorage.getItem('room_id')
      };
      this.service.sendCode(data).subscribe(result => {
        alert(result);
        window.location.reload();

      });
    } else {
      alert('Wrong Code!');
    }

  }
}
