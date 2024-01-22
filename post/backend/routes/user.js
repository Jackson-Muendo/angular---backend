const express = require('express');
const  userschema = require('../models/userschema')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/api/user/signup',(req,res,next)=>{
    bcrypt.hash(req.body.password,10).then(hash=>{
    const user = new userschema({
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      email:req.body.email,
      password:hash,
    })  
    user.save()
    .then((result)=>{
        res.status(201).json({
            message: 'user created',
            result:result,
        })
    })
    })

    
});
router.post('/api/user/login',(req,res,next)=>{
    userschema.findOne({email:req.body.email})
    .then((user1)=>{
        if(!user1){
            return res.status(401).json({
                message: 'authentication failed due  to email enterred',
            })
        
        }
        let fetcheduser = user1;
        return bcrypt.compare(req.body.password,fetcheduser.password)
        .then((result)=>{
            if(!result){
                return res.status(401).json({
                    message : 'authentication failed due to password',
                })
            }
            const token = jwt.sign({email: fetcheduser.email,userid: fetcheduser._id},'A_very_long_string_for_our_secret',{expiresIn:'1h'})
            res.status(200).json({  
                token: token ,
                expiresIn:3600, 
                userid:fetcheduser._id
              });  
        })

        .catch((err)=>{
            console.log(err)
            return res.status(401).json({
                message : 'authentication failed',
            })
            
        })
    })
})

router.get('/api/user/:_id',(req,res,next)=>{
    userschema.findOne()
})
router.get('/api/user',(req,res,next)=>{
    userschema.find()
})

module.exports = router