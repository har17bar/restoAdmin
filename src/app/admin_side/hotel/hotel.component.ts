import { Component, OnInit, Input , ElementRef } from '@angular/core';
import { AdminService } from '../../admin.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

import {Hotel} from '../../Hotel';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  @Input() tempHotel: Hotel;
  imagePath: string;

  constructor(private service: AdminService
    , private router: Router
    , private location: Location
    , private el: ElementRef) {
      this.imagePath = '/images/lang.png';
   }

  ngOnInit() {

    this.getHotel();
  }
  getHotel(): void {
    this.service.getHotel().subscribe(data => {
      if (data.type) {
        this.tempHotel = data.hotel;
      } else {
        alert('Could Not Get Data');
      }
    }, error => {
      console.error('Error During fetching hotel:', error);
      alert('Could Not Get Data');
    });
  }

  save(): void {
    this.service.updateHotel(this.tempHotel).subscribe(msg => {
      alert(msg);
      this.location.back();
    }, error => {
      console.error('Error During save process:', error);
      alert('Could Not Save Data! We Are Having Trouble');
    });
  }

  addAttr(attr: string): void {
    this.tempHotel.attributes.push(attr);
  }

  delAttr(attr: string): void {
    for (let x = 0; x < this.tempHotel.attributes.length; x++) {
        if (this.tempHotel.attributes[x] === attr) {
            this.tempHotel.attributes.splice(x, 1);
        }
    }
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
                this.service.upload(formData).subscribe(
                  // map the success function and alert the response
                   (success) => {
                      alert(success);
                      this.router.navigate(['/admin/hotel', {uploaded: 'true'}]);
                      window.location.reload();
                  },
                  (error) => alert('Could Not Upload The File'));
           }
        }

  deleteFile(img) {
    this.service.deleteFile(img).subscribe(success => {
      alert('Deletion Completed!');
      this.router.navigate(['/admin/hotel', {deleted: 'true'}]);
      window.location.reload();

    }, error => {
      alert('Could Not Delete File');
    });
  }
  }


