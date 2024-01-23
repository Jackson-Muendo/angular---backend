import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(public http:HttpClient,public router: Router){}
  userid:string;
  private tokenTimer: any;  
  private token:string
  private isAuthenticated = false;  
  private userupdated = new Subject<any>();
  private authlistener = new Subject<boolean>();
  private users = [{firstname:'john',lastname:'smith',
  email:'jackmwexh1225@gmail.com',password:'123456'
},];
  
  usersignup(firstname:string,lastname:string,email:string,
    password:string,cpassword:string){
      const user = {firstname:firstname,lastname:lastname,email:email,
        password:password,cpassword:cpassword}
        this.http.post<{message:string}>('https://learning-app-lrpl.onrender.com/api/user/signup',user)
        .subscribe((responseData)=>{
          
          this.users.push(user);
          console.log(user);
          console.log(responseData)
          this.userupdated.next([...this.users])
          this.router.navigate(['/'])
        })
        
  }
  logout(){
    this.token = null;  
    this.isAuthenticated = false
    this.authlistener.next(false);
        
    this.router.navigate(['/'])
    this.userid = null
    this.clearAuthData()
    clearTimeout(this.tokenTimer);
    
  }
  private saveAuthdata(token:string,expirationdate:Date,userid:string){
      localStorage.setItem('token',token);
      localStorage.setItem('expirationdate',expirationdate.toString());
      localStorage.setItem('userid', userid);  
  }
  private  clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expirationdate')
    localStorage.removeItem("userid"); 
  }
  getAuthData(){
    const token = localStorage.getItem('token');
    const expirationdate = localStorage.getItem('expirationdate');
    const userid = localStorage.getItem("userid");  
    if(!token || !expirationdate){
      return false
    }
    return {
      token:token,
      expirationdate:new Date(expirationdate),
      userid:userid
    }
  }
  autoAuthUser(){
    const authinformation=this.getAuthData()
    if(!authinformation){
      return
    }
    const now = new Date()
    const isInFuture = authinformation.expirationdate>now 
    const expiresInDuration = authinformation.expirationdate.getTime() - now.getTime();  
    if(expiresInDuration>0){
      this.token = authinformation.token;  
      this.isAuthenticated = true;
      this.userid = authinformation.userid  
      this.setAuthTimer(expiresInDuration/1000)
      this.authlistener.next(true)
    }
  }
  private setAuthTimer(duration: number) {  
    this.tokenTimer=setTimeout(()=>{  
      this.logout();  
    }, duration*1000);  
      
  } 
  getuserid(){
    return this.userid
  }
  getisauth(){
    return this.isAuthenticated; 
  }
  gettoken(){
    return this.token
  }
  getauthstatuslistener(){
    return this.authlistener.asObservable();
  }
  loginuser(email: string,password: string){
      const user = {email:email, password:password}
      this.http.post<{token:string,expiresIn:number,userid:string}>('https://learning-app-lrpl.onrender.com/api/user/login',user)
      .subscribe((responseData)=>{
        const token = responseData.token
        this.token = token;
        if(token){
        const expiresInDuration = responseData.expiresIn;
        this.setAuthTimer(expiresInDuration)
        // this.tokenTimer=setTimeout(()=>{this.logout}, 
        // expiresInDuration*1);    
        this.isAuthenticated = true; 
        this.userid = responseData.userid
        this.authlistener.next(true);
        const now = new Date
        const expirationdate = new Date(now.getTime()+expiresInDuration)
        this.saveAuthdata(token,expirationdate,this.userid)
        this.router.navigate(['/post-list'])
        }
        console.log(responseData)
      })
    }
  
  getuser(){
    return this.users
  }
}
