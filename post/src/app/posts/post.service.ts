import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router"; 

@Injectable({
    providedIn:'root'
})
export class PostService{
constructor(private http : HttpClient,public router:Router){}
posts:any = []
private postudated = new Subject<any>();
getpost(_id:string){
    //return {...this.posts.find(post=>post._id === _id)}
    return this.http.get<{_id: string, title: string, content:string,creator:string}>("http://localhost:8080/api/posts/"+_id);
    
}
addposts(title:string,content:string){
const post = {title:title,content:content,date:Date.now()}
//post.append('ímage',image,title)
this.http.post<{message:string,post}>('https://learning-app-lrpl.onrender.com/api/posts',post)
.subscribe((responseData)=>{
    console.log(responseData.message);
    this.posts.push(post);
    this.postudated.next([...this.posts]);
    this.router.navigate(['/post-list']);
    //console.log(this.posts)
})

}
getpostupdatelistener(){
    return this.postudated.asObservable();
}

updatepost(_id:string,title:string,content:string){
    const post = {_id:_id,title:title,content:content,date:Date.now()}
    this.http.put<{message:string}>('https://learning-app-lrpl.onrender.com/api/posts/'+_id,post)
    .subscribe((res)=>{
        const updatedposts = [...this.posts]
        const oldpostindex = updatedposts.findIndex(p=>p._id === _id)
        updatedposts[oldpostindex] = post
        this.posts = updatedposts
        this.postudated.next([...this.posts]);
        this.router.navigate(['/post-list']);  
        console.log(this.posts)
        console.log(res.message)
    })
}
getposts(){
    this.http.get<{message:string,posts:any}>('https://learning-app-lrpl.onrender.com/api/posts')
    .subscribe((postdata)=>{
        this.posts = postdata.posts;
        this.postudated.next([...this.posts]);
        console.log(this.posts)
    })
    //return this.posts
   
}
deletepost(postid:string){
    this.http.delete('https://learning-app-lrpl.onrender.com/api/posts/'+postid)
    .subscribe(()=>{ 
        console.log('deleted');
    })
}

}