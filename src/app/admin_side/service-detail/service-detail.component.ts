import { Component, OnInit, Input, ElementRef} from '@angular/core';
import { AdminService } from '../../admin.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Service} from '../../Service';
@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {
  @Input() tempService: Service;
  constructor(private adminService: AdminService
    , private route: ActivatedRoute
    , private location: Location
    , private router: Router
    , private el: ElementRef) { }

  ngOnInit() {

    this.getService();
  }

  getService(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.adminService.getService(id).subscribe(data => {
      if (data.type === 'error') {
          alert(data.msg);
      } else {
          this.tempService = data.service;
      }
    }, (error) => {
      console.error('Error during getService process', error);
      alert('We Had Trouble Getting Data');
    });
  }

  save(): void {
    this.adminService.updateService(this.tempService).subscribe(msg => {
      alert(msg);
      this.location.back();
    }, error => {
      console.error('Error During save process:', error);
      alert('Could Not Save Data! We Are Having Trouble');
    });
  }

  deleteService(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.adminService.deleteService(id).subscribe(msg => {
      if (msg.type) {
        alert(msg.msg);
        this.router.navigate(['/admin/services', {deleted: 'true'}]);
      } else {
        alert(msg);
        this.router.navigate(['/admin/services', {deleted: 'false'}]);
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
                this.adminService.uploadServiceImages(formData).subscribe(
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
    this.adminService.deleteServiceImageFile(img).subscribe(success => {
      alert('Deletion Completed!');
      // this.router.navigate(['/admin/room-detail', {deleted: 'true'}]);
      window.location.reload();

    }, error => {
      alert('Could Not Delete File');
    });
  }

}
