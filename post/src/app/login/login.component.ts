import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(public userservice :UserService,public router:Router){}
  form :FormGroup;
  ngOnInit(){
    this.form = new FormGroup({
      firstname: new FormControl(null,{validators:[Validators.required]}),
      lastname: new FormControl(null,{validators:[Validators.required]}),
      email: new FormControl(null,{validators:[Validators.required]}),
      password: new FormControl(null,{validators:[Validators.required]}),
      
    })}


  login(){
    //console.log(this.form.value)
    //confirm("you are about to submit");
    if(this.form.invalid){
      alert('please enter valid information')
      return
    }
    else{
    this.userservice.loginuser(this.form.value.email,this.form.value.password);  
    //this.router.navigate(['/create'])
  }
    }
    
  
  }

  
