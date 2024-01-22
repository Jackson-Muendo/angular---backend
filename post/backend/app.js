var express = require('express');
var bodyparser = require('body-parser');
var  postschema = require('./postschema');
var mongoose = require('mongoose');
const postroutes = require('./routes/post');
const userroutes = require('./routes/user');


var cors = require('cors')
const app = express();
app.use(bodyparser.json())
app.use(cors());
//mongodb+srv://jackson:x7y8zvEcbzCKYp9q@cluster0.orq3iot.mongodb.net/?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://jackson:Udxi4s49x2uFuC8a@cluster0.orq3iot.mongodb.net/postdatabase?retryWrites=true&w=majority')
.then(()=>{console.log('connected to database!');})
.catch((error)=>{console.log('connection failed! '+ error);})

app.use(postroutes);
app.use(userroutes);
/*
app.post('/api/posts',(req,res,next)=>{
    const post = new postschema({
        title : req.body.title,
        content: req.body.content,
        date: req.body.date,
    })
    //const post = req.body;
    post.save();
    console.log(post)
    res.status(201).json({
        message: 'Post added successfully' 
    })
});
app.get('/api/posts',(req,res,next)=>{
    postschema.find()
    .then((documents)=>{
        console.log(documents)
        res.status(200).json({
            message: 'posts fetched succesfully',
            posts : documents});
    })  
})
app.delete('/api/posts/:id',(req,res,next)=>{
    
    postschema.deleteOne({_id:req.params.id})
    .then((result)=>{
        console.log(result);
    })
    res.status(200).json({
        message:"deleted post successfully",
    })
})
app.put('/api/posts/:_id',(req,res,next)=>{
    const post = new postschema({
        _id:req.params._id,
        title:req.body.title,
        content:req.body.content,
        date: req.body.date,

    })
    postschema.updateOne({_id:req.params._id},post)
    .then((result)=>{
        console.log(post);
        res.status(200).json({
            message: 'updated successfully'
        })
    })
})
app.get('/api/posts/:_id',(req,res,next)=>{
    postschema.findById(req.params._id)
    .then((post)=>{
        if(post){  
            res.status(200).json(post);  
          }else{  
            res.status(404).json({message: 'Post not Found!'});  
          }  
    })
})
*/
module.exports = app;
