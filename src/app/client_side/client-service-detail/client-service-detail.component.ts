import { Component, OnInit, Input, ElementRef} from '@angular/core';
import { ClientService } from '../../client_side/client.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Service} from '../../Service';

@Component({
  selector: 'app-client-service-detail',
  templateUrl: './client-service-detail.component.html',
  styleUrls: ['./client-service-detail.component.css']
})
export class ClientServiceDetailComponent implements OnInit {
  @Input() tempService: Service;

  constructor(private adminService: ClientService
    , private route: ActivatedRoute) { }

  ngOnInit() {
    this.getService();

  }

  getService(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.adminService.getService(id).subscribe(data => {
      if (data.type === 'error') {
          alert(data.msg);
      } else {

        for (let x = 0; x < data.service.images.length; x++) {
          if (x === 0) {
            data.service.images[x] = {tagClass: 'active', img: data.service.images[x], index: x};
          } else {
            data.service.images[x] = {tagClass: null, img: data.service.images[x], index: x};

          }
        }


          this.tempService = data.service;
          console.log('data service:', data.service);
          console.log('tempRoom:', this.tempService);
      }
    }, (error) => {
      console.error('Error during getService process', error);
      alert('We Had Trouble Getting Data');
    });
  }

}
