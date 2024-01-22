import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  public userIsAuthenticated=false
  private authlistenersub:Subscription
  constructor(public userservice:UserService,public router:Router){}
  ngOnInit(){
    this.userIsAuthenticated = this.userservice.getisauth()
    this.authlistenersub = this.userservice.getauthstatuslistener()
    .subscribe((isAuthenticated)=>{
        this.userIsAuthenticated = isAuthenticated
    })
  }
  onlogout(){
    this.userservice.logout()
  }
  ngOnDestroy(){
    this.authlistenersub.unsubscribe()
  }

}
