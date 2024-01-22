import { Component, OnInit } from "@angular/core";
import { NgForm,FormGroup, Validators, FormControl } from "@angular/forms";
import { PostService } from "../post.service";
import { ActivatedRoute, ParamMap,Router } from "@angular/router";
import {mimetype} from "./mime-type.validator";  

@Component({
selector:'app-postcreate',
templateUrl:'post-create.component.html',
})
export class PostcreateComponent implements OnInit {
    constructor(public postservice:PostService,public route:ActivatedRoute,public router:Router){}
    form:FormGroup;
    isLoading = true;
    post:any = [];
    onepost:any =[];
    Pickedimage:string;
    private mode = 'create';
    private _id:string 
    
    ngOnInit(){
        this.isLoading = true;
        this.form = new FormGroup({
            'title':new FormControl(null,{validators:[Validators.required]}),
            'content':new FormControl(null,{validators:[Validators.required]}),
            /*'image':new FormControl(null,{
                validators:[Validators.required],
                asyncValidators: [mimetype],
            }),*/
        });
        this.route.paramMap.subscribe((paramMap:ParamMap)=>{
            
            if(paramMap.has('_id')){
                this.mode = 'edit';
                this._id = paramMap.get('_id');
                this.postservice.getpost(this._id)
                .subscribe((resdata)=>{
                    this.post= {_d:resdata._id,title:resdata.title,content:resdata.content,creator:resdata.creator}
                    this.form.setValue({
                     title:this.post.title,
                     content:this.post.content, 
                      
                    })
                    this.isLoading = false; 
                })
                console.log(this.post)
            }
            else{
                this.isLoading = true; 
                this.mode = 'create';
                this._id = null;
                this.isLoading = false; 
            }
            
        })
    }
    addpost(){
    //    const posts:any = {
    //     title:form.value.title,
    //     content:form.value.textarea
    //    }
    //    this.post.push(posts)
    
    
    if (this.form.invalid){
        alert('pleae enter valid information')
        
        return;
        
    }
    else {
    if(this.mode === 'create'){
        this.postservice.addposts(this.form.value.title,this.form.value.content)  
        this.form.reset()
        
    }
    else {
        this.postservice.updatepost(this._id,this.form.value.title,this.form.value.content)
        this.form.reset()
        
    }
}
    // else if (form.valid){
    //     var c = confirm("You are about to submit your post");
    //     if(c==false){return;}
    //     else{
    //         this.postservice.addposts(form.value.title,form.value.textarea)
    //         form.reset()
    //     }

    
    // }
    }
pickedimage(event:Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image:file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () =>{
        this.Pickedimage = reader.result as string;
    };
    reader.readAsDataURL(file);
}
    
}