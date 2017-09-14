import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'my-app',
  template: `<h1 *ngFor="let obj of data">{{obj.name}}</h1>`,
})
export class AppComponent implements OnInit{
  data: any;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.getData().subscribe((data: any) => {
      this.data = data;
    }, (err: any)=> {
      alert(err)
    })
  }
}
