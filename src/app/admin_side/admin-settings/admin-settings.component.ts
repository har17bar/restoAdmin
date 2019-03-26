import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import {Admin} from '../../Admin';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {
  tempAdmin: Admin;
  constructor(private service: AdminService, private router: Router) { }

  ngOnInit() {
  }
  updateAdminCreds(username: string, password: string, newPassword: string): void {
   const temp = {
     username: username,
     password: password,
     newPassword: newPassword
   };
    this.service.updateAdminCreds(temp).subscribe(msg => {
      if (msg.type) {
        alert(msg.msg);
        this.router.navigate(['/admin', {updated: 'true'}]);
      } else {
        alert(msg);
      }

    }, error => {
        console.error('Error During updating:', error);
        alert('Could Not Update Data');
    });
  }
}
