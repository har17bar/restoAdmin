import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {

  tempBookings: [] = null;
  constructor(private service: AdminService) { }

  ngOnInit() {
    this.getAllBookings();
  }
  getAllBookings(): void {
    this.service.getAllBookings().subscribe(data => {
      if (data.type) {
        const currentDate = new Date();
        for (let x = 0; x < data.Booking.length; x++) {
          const coutDate = new Date(data.Booking[x].booking.check_out);
          if (currentDate < coutDate) {
            data.Booking[x]['current'] = true;
          }

        }
        this.tempBookings = data.Booking;
        console.log('tempBooking:', data.Booking);
      } else {
        alert('Sorry We Had Trouble!');
      }
    });
  }
}
