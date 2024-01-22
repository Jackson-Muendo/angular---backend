import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
constructor(public userservice:UserService,public route:Router){}
form:FormGroup;
ngOnInit(){
  this.form = new FormGroup({
    firstname: new FormControl(null,{validators:[Validators.required]}),
    lastname: new FormControl(null,{validators:[Validators.required]}),
    email: new FormControl(null,{validators:[Validators.required]}),
    password: new FormControl(null,{validators:[Validators.required]}),
    cpassword: new FormControl(null,{validators:[Validators.required]}),
  })
}
signup(){
if(this.form.invalid){
  alert('please enter valid data')
  return
}
else if(this.form.value.password!==this.form.value.cpassword)
{
  alert('passwords does not match');
  return
}
else {
  this.userservice.usersignup(this.form.value.firstname,this.form.value.lastname,
    this.form.value.email,this.form.value.password,this.form.value.cpassword)
    alert('successfully registered')
    //this.route.navigate(['/login'])
    console.log(this.form.value)
  }

}
}
