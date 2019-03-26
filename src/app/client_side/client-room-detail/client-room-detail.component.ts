import { Component, OnInit , Input , ElementRef} from '@angular/core';
import {ClientService} from '../client.service';

import { Room } from '../../Room';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-client-room-detail',
  templateUrl: './client-room-detail.component.html',
  styleUrls: ['./client-room-detail.component.css']
})
export class ClientRoomDetailComponent implements OnInit {
  @Input() tempRoom: Room;
  public tempBookings: [] = null;
  private roomId;
  public show = false;
  constructor(private service: ClientService
    , private route: ActivatedRoute) { }

  ngOnInit() {
    this.getRoom();

  }

  getRoom(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.roomId = id;
    this.service.getRoom(id).subscribe(data => {
      if (data.type === 'error') {
          alert(data.msg);
      } else {

        for (let x = 0; x < data.room.images.length; x++) {
          if (x === 0) {
            data.room.images[x] = {tagClass: 'active', img: data.room.images[x], index: x};
          } else {
            data.room.images[x] = {tagClass: null, img: data.room.images[x], index: x};

          }
        }





          this.tempRoom = data.room;
          console.log('data room:', data.room);
          console.log('tempRoom:', this.tempRoom);
          console.log('Bookings:', data.bookings);
          if (data.bookings) {
            this.tempBookings = data.bookings;
          }
      }
    }, (error) => {
      // console.error('Error during getRoom process', error);
      alert('We Had Trouble Getting Data');
    });
  }
  reserve(): void {
    this.show = !this.show;
    localStorage.setItem('room_id', this.roomId);
  }

}
