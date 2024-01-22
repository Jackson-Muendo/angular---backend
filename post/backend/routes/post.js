const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router();
const postschema  = require('../postschema');
const multer = require('multer')
const checkauth = require('../middleware/check-auth');

const MIME_TYPE_MAP = {  
    'image/png': 'png',  
    'image/jpeg': 'jpg',  
    'image/jpg': 'jpg'  
  };  
const storage = multer.diskStorage(
    {
        destination: (req,file,cb)=>{
            const isValid = MIME_TYPE_MAP[file.mimetype]; 
            let error = new Error("Invalid Mime Type");  
            if(isValid){  
              error = null;  
            }  
            cb(error, "backend/images");  
        },
        filename: (req, file, cb)=>{  
            const name = file.originalname.toLowerCase().split(' ').join('_');  
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, name+ '-'+ Date.now()+ '.'+ ext);    
        }  
    }
);  
let userData = [] 
let userEmail = userData.email
//router.post('/api/posts', multer(storage).single("image"),(req,res,next)
router.post('/api/posts',checkauth, (req,res,next)=>{
    const url = req.protocol + '://'+ req.get("host");
    const gettoken = req.headers.authorization.split(' ')[1]
    const rtoken = jwt.verify(gettoken,"A_very_long_string_for_our_secret")
    userinfor = {email:rtoken.email,userid:rtoken.userid}
    userData = userinfor
    console.log(userData)
    //creator = userData.email
    
    //console.log(userData)
    const post = new postschema({
        title : req.body.title,
        content: req.body.content,
        date: req.body.date,
        creator:userData.userid,

        //imagePath: url + "/images"+req.file.filename,
        
    })
    //const post = req.body;
    post.save().then((result)=>{
        res.status(201).json({
            message: 'Post added successfully' ,
            post: {  
                /*id: result._id,  
                title: result.title,  
                content: result.content,  
                imagePath: result.imagePath */ 
                ...result,  
                id: result._id, 
        } 
        })
    })
    
    
});
router.get('/api/posts',checkauth,(req,res,next)=>{
    postschema.find()
    .then((documents)=>{
        console.log(documents)
        res.status(200).json({
            message: 'posts fetched succesfully',
            posts : documents});
    })  
})
router.delete('/api/posts/:id',checkauth,(req,res,next)=>{
    const gettoken = req.headers.authorization.split(' ')[1]
    const rtoken = jwt.verify(gettoken,"A_very_long_string_for_our_secret")
    userinfor = {email:rtoken.email,userid:rtoken.userid}
    userData = userinfor
    creator = userData.userid
    postschema.deleteOne({_id:req.params.id,creator:creator})
    .then((result)=>{
        console.log(result);
        if(result.deletedCount>0){
            res.status(200).json({
                message:'post deleted successfully',

            })
        
        }
        else{
            res.status(401).json({
                message:'not authorized to delete this post'
            })
        }
    })
    
})
router.put('/api/posts/:_id',checkauth,(req,res,next)=>{
    const gettoken = req.headers.authorization.split(' ')[1]
    const rtoken = jwt.verify(gettoken,"A_very_long_string_for_our_secret")
    userinfor = {email:rtoken.email,userid:rtoken.userid}
    userData = userinfor
    creator = userData.userid
    const post = new postschema({
        _id:req.params._id,
        title:req.body.title,
        content:req.body.content,
        date: req.body.date,
        creator:userData.userid,

    })
    postschema.updateOne({_id:req.params._id,creator:creator},post)
    .then((result)=>{
        console.log(creator);
        console.log(userData);
        if(result.modifiedCount>0){
        console.log(post);
        console.log(creator);
        res.status(200).json({
            message: 'updated successfully',
            
        })}
        else{
            res.status(401).json({
                message:'not authorized to edit that post',
                 })
                 
            
        }
    })
    
})
router.get('/api/posts/:_id',checkauth,(req,res,next)=>{
    postschema.findById(req.params._id)
    .then((post)=>{
        if(post){  
            res.status(200).json(post);  
          }else{  
            res.status(404).json({message: 'Post not Found!'});  
          }  
    })
})
module.exports = router