import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Room } from '../../Room';
import {Router} from '@angular/router';


import {AdminNavbarComponent} from '../admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],

})

export class AdminComponent implements OnInit {
  rooms: Room[];
  @Input() tempAttr: string[] = [];
  constructor(private service: AdminService, private router: Router) { }

  ngOnInit() {
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
      console.error('Error During Fetching all rooms:' + error);
    });
  }

}
