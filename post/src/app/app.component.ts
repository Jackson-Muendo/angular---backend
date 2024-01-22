import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'post';
  constructor(public authservice:UserService){}
  ngOnInit(){
    this.authservice.autoAuthUser()
  }
}
