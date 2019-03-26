import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Room } from '../../Room';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {AdminNavbarComponent} from '../admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {
  @Input() tempAttr: string[] = [];

  constructor(private service: AdminService, private router: Router) { }

  ngOnInit() {
  }
  addAttr(attr: string) {
    this.tempAttr.push(attr);
  }
  addRoom(roomName: string, roomType: string, max_occupancy: number, cost_per_night: number, floor: number) {
    const tempRoom = {
      name: roomName,
      type: roomType,
      max_occupancy: max_occupancy,
      cost_per_night: cost_per_night,
      floor: floor,
      attributes: this.tempAttr,
      images: []
    };

    console.log('temp Room:', tempRoom);
    this.service.addRoom(tempRoom)
    .subscribe(msg => {
      if (msg.type) {
        alert(msg.msg);
        this.router.navigate([`/admin/room-detail/${msg.id}`, {added: 'true'}]);
      } else {
        alert(msg);
        this.router.navigate(['/admin', {added: 'false'}]);

      }
    }, (error) => {
      alert('Failed to Add Room: We Had Trouble');
    });
  }
}
