import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../admin.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-in-resto',
  templateUrl: './in-resto.component.html',
  styleUrls: ['./in-resto.component.css']
})

export class InRestoComponent implements OnInit {

  constructor(private http: HttpClient, private service: AdminService, private router: Router, private route: ActivatedRoute) {

  }


  ngOnInit() {
    this.loadScript('../../../assets/scriptfile.js');
    this.route.params.subscribe(params => {
      this.service.getResto(params['id']).subscribe((result) => {
          console.log(result);
      });
    });
  }


  uploadAndProgress() {
   var categoryChilds= document.getElementsByClassName('For-append-category')[0].getElementsByTagName('input'),
        childs = document.getElementsByClassName(' For-append')[0].children,
        formDataInstance = new FormData;
    for (let i = 0, catChildLength = categoryChilds.length; i < catChildLength; ++i) {
      if (categoryChilds[i].type == 'file') {
        Array.from(categoryChilds[i].files).forEach(f => formDataInstance.append('categoryImage', f));
      } else {
        formDataInstance.append('categoryName',categoryChilds[i].value)
        console.log(categoryChilds[i]['value']);
      }
    }
    for (let i = 0, childLength = childs.length; i < childLength; ++i) {
      let el = childs[i].getElementsByTagName('input');
      let obj = {};
      let name;
      for (let j = el.length - 1; j > -1; --j) {
        if ( el[j].type != 'file') {
          obj[el[j].name] = el[j].value;
        } else {
          console.log();
          if ( el[j].files.length) {
            name = el[j].files['0'].name;
            Array.from(el[j].files).forEach(f => formDataInstance.append('files', f));
          } else {
            // formDataInstance.append('files', 'null');
            name = 'null';
          }
        }
      }
      formDataInstance.append(name, JSON.stringify(obj));
      this.uploadImage(formDataInstance);
    }

  }

  uploadImage(item) {
    this.http.post('http://192.168.5.97:3000/admin/menu/createCategories', item, {reportProgress: true, observe: 'events'})
      .subscribe(event => {

      }, error => {
        // console.log(error, 'errr');
      });
  }


  loadScript(src) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(script);
    script.src = src;
  }


}



