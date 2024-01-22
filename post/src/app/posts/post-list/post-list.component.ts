import { Component, OnDestroy, OnInit } from "@angular/core";
import { PostService } from "../post.service";
import { Subscription } from "rxjs";
import { UserService } from "src/app/user.service";
//import {MatPaginator} from '@angular/material/paginator';


@Component({
    selector:'app-postlist',
    templateUrl:'post-list.component.html',

})
export class PostlistComponent implements OnInit,OnDestroy{
    userid:string;
    totalpost = 10;
    postsperpage = 2;
    pageoptions = [1,2,5,10]

    isLoading = true;
    posts:any=[]
    public userIsauthenticated = false
    private postsub:Subscription;
    private authStatusSub:Subscription;
    constructor(public postservice:PostService,public userservice:UserService){}
    ngOnInit(){
        this.display();
        

    }
    
    display(){
        this.postservice.getposts()
        this.userid = this.userservice.getuserid()
        this.postsub = this.postservice.getpostupdatelistener()
        .subscribe((posts)=>{
            this.posts = posts;
            this.isLoading = false;
        })
        this.userIsauthenticated = this.userservice.getisauth();  
        this.authStatusSub = this.userservice.getauthstatuslistener()
        .subscribe(()=>{
                this.userIsauthenticated = true
                this.userid = this.userservice.getuserid()

        })
        this.isLoading = false;
        console.log(this.posts)
    }
    delete(index:string){
        var c = confirm("You are about to delete this post");
        
        if(c==true){
            this.postservice.deletepost(index)
            //setTimeout(this.ngOnInit,500);
            this.ngOnInit()
            this.isLoading = true;

           // this.posts.splice(index,1)
        }
        
        return

    
    }
    ngOnDestroy(){
        this.postsub.unsubscribe()
        this.authStatusSub.unsubscribe()
    }
    
    
}