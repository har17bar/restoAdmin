import { Component, OnInit, VERSION } from '@angular/core';
import {AdminService} from '../../admin.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import * as $ from 'jquery';
@Component({
  selector: 'app-in-resto',
  templateUrl: './in-resto.component.html',
  styleUrls: ['./in-resto.component.css']
})

export class InRestoComponent implements OnInit {

  constructor(private http: HttpClient, private service: AdminService, private router: Router, private route: ActivatedRoute) {

  }

  percentDone: number;
  uploadSuccess: boolean;
  version = VERSION;
  ngOnInit() {
    this.loadScript('../../../assets/scriptfile.js');
    this.route.params.subscribe(params => {
      this.service.getResto(params['id']).subscribe((result) => {
          console.log(result);
      });
    });
  }


  basicUpload(files: File[]) {
    const formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f))
    this.http.post('https://file.io', formData)
      .subscribe(event => {
        console.log('done');
      });
  }

  basicUploadSingle(file: File) {
    this.http.post('https://file.io', file)
      .subscribe(event => {
        console.log('done');
      });
  }

  uploadAndProgress() {
    var childs =$('.form-group').find("> div");
    var childLength =childs.length;
      for(var i=0; i<childLength;++i){
        var el = $(childs[i]).find("> input")
        for(var x=0; x< el.length; ++x){
          var obj ={};
          obj["name"] = "poxos"
          if($(el[x]).attr("name") =='item'){
            var file = $(el[x]).prop('files');
            obj["pic"]=file;
          }
        }
      this.xacho(obj)
      }

  }
  xacho(obj: Object) {
    // let headers =  {headers: new  HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})};
    const formData = new FormData();
    Array.from(obj.pic).forEach(f => formData.append('file', f));
    formData.append('harut','harut')
    console.log(formData)
    this.http.post('http://192.168.5.97:3000/admin/menu/createCategories', obj.pic, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          console.log('done', HttpResponse)
          this.uploadSuccess = true;
        }
      }, error => {
        console.log(error, 'errr');
      });
  }
  uploadAndProgressSingle(file: File) {
    this.http.post('https://file.io', file, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
      });
  }
  loadScript(src) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(script);
    script.src = src;
  }


}



