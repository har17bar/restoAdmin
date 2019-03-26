
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import {Router} from '@angular/router';
import {Service} from '../../Service';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  services: Service[];
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.getAllServices();
  }
  getAllServices(): void {
    this.adminService.getAllServices().subscribe(data => {
        console.log('service data: ', data);
        this.services = data;
    }, error => {
        alert('Please try again or check your connection');
        console.error('Error During Fetching all services:' + error);
    });
  }
}
