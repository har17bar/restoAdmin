import { Component, OnInit } from '@angular/core';
// import { AdminService } from '../admin.service';
import { Room } from '../Room';

@Component({
  selector: 'app-any-component',
  templateUrl: './any-component.component.html',
  styleUrls: ['./any-component.component.css']
})
export class AnyComponentComponent implements OnInit {
  msg: Room[];

  constructor() { }

  ngOnInit() {
  }
}
