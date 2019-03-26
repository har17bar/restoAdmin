import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from '../../admin.service';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
  }
  addService(serviceName: string, serviceType: string) {
    const tempService = {
      name: serviceName,
      type: serviceType,
      images: []
    };

    console.log('temp Room:', tempService);
    this.adminService.addService(tempService)
    .subscribe(msg => {
      if (msg.type) {
        alert(msg.msg);
        this.router.navigate([`/admin/services/service-detail/${msg.id}`, {added: 'true'}]);
      } else {
        alert(msg);
        this.router.navigate(['/admin/services', {added: 'false'}]);

      }
    }, (error) => {
      alert('Failed to Add Service: We Had Trouble');
    });
  }
}
