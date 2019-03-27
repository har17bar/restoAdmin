import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../admin.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-in-resto',
  templateUrl: './in-resto.component.html',
  styleUrls: ['./in-resto.component.css']
})
export class InRestoComponent implements OnInit {

  constructor(private service: AdminService, private router: Router,private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.service.getResto(params['id']).subscribe((result) => {
          console.log(result)
      });
    });
  }


}
