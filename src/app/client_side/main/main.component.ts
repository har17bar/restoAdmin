import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../../Room';
import {Router} from '@angular/router';
import {ClientService} from '../client.service';
import {Hotel} from '../../Hotel';
import {Service} from '../../Service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public myclass = 'active';
  public stars;
  rooms: Room[];
  @Input() tempAttr: string[] = [];
  @Input() tempHotel: Hotel;
  services: Service[];
  constructor(private service: ClientService, private router: Router) { }

  ngOnInit() {
    this.getHotel();
    this.getAllServices();

    this.getAllRooms();

  }
  getAllRooms(): void {
    this.service.getAllRooms().subscribe((data) => {
      console.log('rooms data:', data);
      this.rooms = data;
     // console.log(data);
    },
    (error) => {
      alert('Please try again or check your connection');
      // console.error('Error During Fetching all rooms:' + error);
    });
  }
  getHotel(): void {
    this.service.getHotel().subscribe(data => {
      if (data.type) {
        for (let x = 0; x < data.hotel.images.length; x++) {
          if (x === 0) {
            data.hotel.images[x] = {tagClass: 'active', img: data.hotel.images[x], index: x};
          } else {
            data.hotel.images[x] = {tagClass: null, img: data.hotel.images[x], index: x};

          }
        }
        this.tempHotel = data.hotel;
        this.stars = new Array(data.hotel.stars);
        console.log('data hotel:', data.hotel);
        console.log('tempHotel:', this.tempHotel);
      } else {
        alert('Could Not Get Data');
      }
    }, error => {
      console.error('Error During fetching hotel:', error);
      alert('Could Not Get Data');
    });
  }
  getAllServices(): void {
    this.service.getAllServices().subscribe(data => {
        console.log('service data: ', data);
        this.services = data;
    }, error => {
        alert('Please try again or check your connection');
        console.error('Error During Fetching all services:' + error);
    });
  }
  Select(id): void {
    console.log('in Select');
    const x = document.querySelector(id);
    if (x) {
      console.log(x);
      x.scrollIntoView();
    }
  }


}
