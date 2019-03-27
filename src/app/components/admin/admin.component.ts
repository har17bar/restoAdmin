import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from '../../admin.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],

})

export class AdminComponent implements OnInit {
  @Input() tempAttr: string[] = [];
  constructor(private service: AdminService, private router: Router) {
    console.log('adminnnn');
  }

  ngOnInit() {
  //  this.getAllRooms();
  }
  /*getAllRooms(): void {
    this.service.getAllRooms().subscribe((data) => {
      console.log('rooms data:', data);
      this.rooms = data;
     // console.log(data);
    },
    (error) => {
      alert('Please try again or check your connection');
      console.error('Error During Fetching all rooms:' + error);
    });
  }*/

}
