import { Component, OnInit , Input , ElementRef} from '@angular/core';
import { AdminService } from '../../admin.service';
import { Room } from '../../Room';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  @Input() tempRoom: Room;
  public tempBookings: [] = null;

  private roomId;
  constructor(private service: AdminService
    , private route: ActivatedRoute
    , private location: Location
    , private router: Router
    , private el: ElementRef) { }

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
          this.tempRoom = data.room;
          this.tempBookings = data.bookings;

      }
    }, (error) => {
      console.error('Error during getRoom process', error);
      alert('We Had Trouble Getting Data');
    });
  }
  addAttr(attr: string): void {
    this.tempRoom.attributes.push(attr);
  }
  delAttr(attr: string): void {
    for (let x = 0; x < this.tempRoom.attributes.length; x++) {
        if (this.tempRoom.attributes[x] === attr) {
            this.tempRoom.attributes.splice(x, 1);
        }
    }
  }

  save(): void {
    this.service.updateRoom(this.tempRoom).subscribe(msg => {
      alert(msg);
      this.router.navigate(['/admin', {updated: 'true'}]);
    }, error => {
      console.error('Error During save process:', error);
      alert('Could Not Save Data! We Are Having Trouble');
    });
  }
  deleteRoom(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.deleteRoom(id).subscribe(msg => {
      if (msg.type) {
        alert(msg.msg);
        this.router.navigate(['/admin', {deleted: 'true'}]);
      } else {
        alert(msg);
        this.router.navigate(['/admin', {deleted: 'false'}]);
      }
    }, error => {
      console.error('Error During delete process:', error);
      alert('Could Not Delete Data! We Are Having Trouble');
    });
  }


  upload() {
    console.log('in upload()');
     // locate the file element meant for the file upload.
     const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
     // get the total amount of files attached to the file input.
     const fileCount: number = inputEl.files.length;
     // create a new fromdata instance
     const formData = new FormData();
     // check if the filecount is greater than zero, to be sure a file was selected.
         if (fileCount > 0) { // a file was selected
             // append the key name 'photo' with the first file in the element
                 formData.append('photo', inputEl.files.item(0));
                 console.log('formData: ', formData);
             // call the angular http method
                this.service.uploadRoomImages(formData).subscribe(
                  // map the success function and alert the response
                   (success) => {
                      alert(success);
                      // this.router.navigate([`/admin/room-detail/`, {uploaded: 'true'}]);
                      window.location.reload();
                  },
                  (error) => alert('Could Not Upload The File'));
           }
        }

  deleteFile(img) {
    this.service.deleteRoomImageFile(img).subscribe(success => {
      alert('Deletion Completed!');
      // this.router.navigate(['/admin/room-detail', {deleted: 'true'}]);
      window.location.reload();

    }, error => {
      alert('Could Not Delete File');
    });
  }
}
